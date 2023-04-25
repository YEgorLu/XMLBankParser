import fetch from "node-fetch";
import AdmZip from "adm-zip";
import iconv from 'iconv-lite';
import {writeFileSync} from "fs";
import path from "path";
const {decode} = iconv;
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function getBicsData(): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://www.cbr.ru/s/newbik')
            const data: Buffer[] = []
            let dataLen: number = 0;
            response.body?.on('data', (chunk: Buffer) => {
                data.push(chunk);
                dataLen += chunk.length;
            }).on('end', () => {
                const buf = Buffer.alloc(dataLen);
                for (let i = 0, pos = 0; i < data.length; i++) {
                    data[i].copy(buf, pos);
                    pos += data[i].length;
                }
                const zip = new AdmZip(buf);
                const entries = zip.getEntries();
                const xmlArr: string[] = [];
                entries.map(e => e.getData())
                    .forEach(e => xmlArr.push(decode(e, 'win1251')))

                resolve(xmlArr.join(''))
            });
        } catch (err) {
            reject(err);
        }
    })
}
