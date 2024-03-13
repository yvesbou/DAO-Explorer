import fetch from "node-fetch"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

// Obtain the file path of the current module
const __filename = fileURLToPath(import.meta.url);
// Obtain the directory path of the current module
const __dirname = dirname(__filename);
// Load the .env file located in the parent directory
config({ path: `${__dirname}/../.env` });

const options = {method: 'POST', headers: {'X-DUNE-API-KEY': process.env.DUNE_API_KEY as string}};

const id = 3519705;

export const executeQuery = async (id: string) => {
    try {
        const response = await fetch(`https://api.dune.com/api/v1/query/${id}/execute`, options);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
