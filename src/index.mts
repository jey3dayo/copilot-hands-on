import jsdom from 'jsdom';
import pLimit from 'p-limit';
import fetch from 'node-fetch';
import { Prisma, PrismaClient } from '@prisma/client';
import { parse } from 'date-fns';
import { seeds, skipContents } from './config/index.mjs';

const prisma = new PrismaClient();
const today = new Date();

const { JSDOM } = jsdom;

const plimit = pLimit(1);
const tasks = seeds.map(({ id: seedId, type: parseType, url, selector }) =>
  plimit(async () => {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const nodes = document.querySelectorAll(selector);
    const contents = Array.from(nodes, root =>
      root.textContent
        ?.trim()
        .split('\n')
        .filter(v => !skipContents.includes(v)),
    );

    const rows = contents
      .map(content => {
        let no;
        let title;
        let date;

        switch (parseType) {
          case 'urasunday':
            [no, title, date] = content as string[];
            no = no?.match(/[＃|第]([\d]*)\s*/)?.[1] ?? no;
            return {
              seedId,
              no,
              title,
              date: parse(date as string, 'yyyy/MM/dd', new Date()),
              createdAt: today,
            } as Prisma.ArticleCreateInput;

          case 'yanmaga':
            [date, title] = content as string[];
            no = title?.match(/[＃|第]([\D]*)+\s/)?.[1] ?? title;
            return {
              seedId,
              no,
              title,
              date: parse(date as string, 'yyyy/MM/dd', new Date()),
              createdAt: today,
            } as Prisma.ArticleCreateInput;
          default:
            return null;
        }
      })
      .filter(v => v);

    const queries = rows.map(row =>
      prisma.article.upsert({
        where: { seedId_no: { seedId: row?.seedId, no: row?.no } } as Prisma.ArticleWhereUniqueInput,
        create: row as Prisma.ArticleCreateInput,
        update: row as Prisma.ArticleUpdateInput,
      }),
    );

    await prisma.$transaction(queries);
  }),
);

await Promise.resolve(tasks);

const articles = await prisma.article.findMany({
  where: { seedId: 1 },
  skip: 0,
  take: 3,
  orderBy: { date: 'desc' },
});

console.log(articles);
