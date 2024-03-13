import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

import { DuneClient } from "./duneClient.ts";


// Obtain the file path of the current module
const __filename = fileURLToPath(import.meta.url);
// Obtain the directory path of the current module
const __dirname = dirname(__filename);
// Load the .env file located in the parent directory
config({ path: `${__dirname}/../.env` });


const main = async () => {
    const apiKey = process.env.DUNE_API_KEY as string;
    const duneClient = new DuneClient(apiKey);
    
    const queryId = "3519705";
    duneClient.getDataFromQuery(queryId);
}

main();