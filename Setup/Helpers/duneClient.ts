import fetch from "node-fetch";
import fs from 'fs';

export class DuneClient {
    private baseUrl= "https://api.dune.com";
    private apiKey: string;
    

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async executeQuery(id: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/api/v1/query/${id}/execute`, {method: 'POST', headers: {'X-DUNE-API-KEY': this.apiKey}});
            return await response.json();
        } catch (err) {
            throw new Error(`Error executing query: ${err}`);
        }
    }

    async getExecutionStatus(executionId: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/api/v1/execution/${executionId}/status`, {method: 'POST', headers: {'X-DUNE-API-KEY': this.apiKey}});
            return await response.json();
        } catch (err) {
            throw new Error(`Error executing query: ${err}`);
        }
    }

    async getExecutionResult(executionId: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/api/v1/execution/${executionId}/results`, {method: 'POST', headers: {'X-DUNE-API-KEY': this.apiKey}});
            return await response.json();
        } catch (err) {
            throw new Error(`Error executing query: ${err}`);
        }
    }

    private saveResultToFile(result: any): void {
        const dataDirectory = '../../data';
        if (!fs.existsSync(dataDirectory)) {
            fs.mkdirSync(dataDirectory);
        }
        const filename = `${dataDirectory}/execution_result_${new Date().toISOString()}.json`;
        fs.writeFileSync(filename, JSON.stringify(result, null, 2));
    }

    async getDataFromQuery(id: string): Promise<any> {
        try {
            const executionId = await this.executeQuery(id);
            let isExecutionFinished = false;
            while(!isExecutionFinished){
                const statusResponse = await this.getExecutionStatus(executionId);
                if (statusResponse.state === 'QUERY_STATE_COMPLETED') {
                    isExecutionFinished = true;
                    const result = await this.getExecutionResult(executionId);
                    console.log(result)
                    this.saveResultToFile(result);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
                }
            }
        } catch (error) {
            throw new Error(`Error executing query: ${error}`);
        }
    }
}