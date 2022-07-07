import fetch from 'node-fetch';
import { params } from './config/index.mjs';

const data = await fetch('https://www.jma.go.jp/bosai/common/const/area.json').then(v => v.json());
console.log(data);
console.log({ params });
