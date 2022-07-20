import { format } from 'date-fns';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import { params } from './config/index.mjs';

interface Area {
  centers: any[];
  offices: any[];
  class10s: any[];
  class15s: any[];
  class20s: any[];
}

const data = (await fetch('https://www.jma.go.jp/bosai/common/const/area.json').then(v => v.json())) as Area;
console.log(Object.keys(data));

const prisma = new PrismaClient();

const today = new Date();
const createdBy = process?.env?.USER ?? 'unknown';
await prisma.article.create({
  data: {
    title: `title ${format(today, 'yyyy-MM-dd HH:mm:ss')}`,
    date: today,
    createdAt: today,
    createdBy,
  },
});

const articles = await prisma.article.findMany({
  orderBy: { createdAt: 'desc' },
});

console.log(articles);

console.log({ params });
