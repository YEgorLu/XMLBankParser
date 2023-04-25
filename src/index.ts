import {parseBics} from "./utils/xmlParser.js";
import {writeFileSync} from "fs";
import path from 'path';
import {fileURLToPath} from 'url';
import {getBicsData} from "./utils/dataFetcher.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


getBicsData()
    .then(xml => parseBics(xml))
    .then(info => JSON.stringify(info))
    .then(info => {
        const pathToOutput = path.join(__dirname, '..', 'output.txt')
        writeFileSync(pathToOutput, info)
    })
    .catch(console.error)
    .finally(() => process.exit())
