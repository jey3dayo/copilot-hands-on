export const skipContents = ['', 'NEW', '続きはマンガワンでお楽しみいただけます'];

type SeedType = 'urasunday' | 'yanmaga';
const selectors = {
  urasunday: 'div.chapter ul li',
  yanmaga: 'div.mod-episode-body',
};

type Seed = {
  id: number;
  name: string;
  type: SeedType;
  url: string;
  selector: string;
};
export const seeds: Seed[] = [
  {
    id: 1,
    name: 'アフターゴッド',
    type: 'urasunday',
    url: 'https://urasunday.com/title/1755',
    selector: selectors.urasunday,
  },
  {
    id: 2,
    name: '満州アヘンスクワッド',
    type: 'yanmaga',
    url: 'https://yanmaga.jp/comics/満州アヘンスクワッド',
    selector: selectors.yanmaga,
  },
  {
    id: 3,
    name: 'ファブル',
    type: 'yanmaga',
    url: 'https://yanmaga.jp/comics/ザ_ファブル',
    selector: selectors.yanmaga,
  },
];

export default { seeds, skipContents };
