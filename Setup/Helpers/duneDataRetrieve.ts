



const options = {method: 'POST', headers: {'X-DUNE-API-KEY': process.env.DUNE_API_KEY as string}};



export const executeQuery = async (id: string) => {
    try {
        const response = await fetch(`https://api.dune.com/api/v1/query/${id}/execute`, options);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}




