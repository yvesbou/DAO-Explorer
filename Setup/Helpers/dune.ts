import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
import fs from 'fs';

import { DuneClient } from "./duneClient.js";


// Obtain the file path of the current module
const __filename = fileURLToPath(import.meta.url);
// Obtain the directory path of the current module
const __dirname = dirname(__filename);
// Load the .env file located in the parent directory
config({ path: `${__dirname}/../.env` });


const main = async () => {
    const apiKey = process.env.DUNE_API_KEY as string;
    const duneClient = new DuneClient(apiKey);
    
    // const queryId = "3519705";
    // duneClient.getDataFromQuery(queryId);

    // do pagination and store the result in files (rewrite getDataFromQuery)
    const r = await duneClient.getExecutionResult('01HRYFFK1VCQFY6YB9ERC6G57C', "10000", "0");
    console.log(r.result.rows[0])
    const dataDirectory = '../Data';
    if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory);
    }
    const filename = `${dataDirectory}/execution_result_${new Date().toISOString()}.json`;
    console.log(filename)
    fs.writeFileSync(filename, JSON.stringify(r.result.rows, null, 2));
    // console.log(r)
}

main();