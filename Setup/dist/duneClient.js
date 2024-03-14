import fetch from "node-fetch";
import fs from 'fs';
export class DuneClient {
    baseUrl = "https://api.dune.com";
    apiKey;
    QUERY_LIMIT = 20_000;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async executeQuery(id) {
        try {
            const response = await fetch(`${this.baseUrl}/api/v1/query/${id}/execute`, { method: 'POST', headers: { 'X-DUNE-API-KEY': this.apiKey } });
            return await response.json();
        }
        catch (err) {
            throw new Error(`Error executing query: ${err}`);
        }
    }
    async getExecutionStatus(executionId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/v1/execution/${executionId}/status`, { method: 'GET', headers: { 'X-DUNE-API-KEY': this.apiKey } });
            return await response.json();
        }
        catch (err) {
            throw new Error(`Error getting Execution Status: ${err}`);
        }
    }
    async getExecutionResult(executionId, limit, offset) {
        try {
            const params = new URLSearchParams({ "limit": limit, "offset": offset });
            const response = await fetch(`${this.baseUrl}/api/v1/execution/${executionId}/results?${params}`, { method: 'GET', headers: { 'X-DUNE-API-KEY': this.apiKey } });
            return await response.json();
        }
        catch (err) {
            throw new Error(`Error getting Execution Result: ${err}`);
        }
    }
    saveResultToFile(executionResult) {
        const dataDirectory = '../../Data';
        if (!fs.existsSync(dataDirectory)) {
            fs.mkdirSync(dataDirectory);
        }
        const filename = `${dataDirectory}/execution_result_${new Date().toISOString()}.json`;
        fs.writeFileSync(filename, JSON.stringify(executionResult.result.rows, null, 2));
    }
    async getDataFromQuery(id) {
        try {
            const queryResult = await this.executeQuery(id);
            const executionId = queryResult.execution_id;
            console.log(queryResult);
            let isExecutionFinished = false;
            while (!isExecutionFinished) {
                const statusResponse = await this.getExecutionStatus(executionId);
                if (statusResponse.state === 'QUERY_STATE_COMPLETED') {
                    isExecutionFinished = true;
                    const totalRows = statusResponse.total_row_count;
                    var iterations = Math.floor(totalRows / this.QUERY_LIMIT);
                    const remainder = totalRows % this.QUERY_LIMIT;
                    if (remainder)
                        iterations = iterations + 1;
                    for (let index = 0; index < iterations; index++) {
                        const offset = index * this.QUERY_LIMIT;
                        const executionResult = await this.getExecutionResult(executionId, String(this.QUERY_LIMIT), String(offset));
                        console.log(executionResult);
                        console.log(executionResult.result.rows[0]);
                        // transient break
                        break;
                        // this.saveResultToFile(executionResult);
                    }
                }
                else {
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
                }
            }
        }
        catch (error) {
            throw new Error(`Error getting Data From Query: ${error}`);
        }
    }
}
//# sourceMappingURL=duneClient.js.map