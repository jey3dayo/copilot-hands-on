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

console.log({ params });
