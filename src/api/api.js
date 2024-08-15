// src/api.js
import axios from 'axios';

// Replace with your generated API URL
const apiUrl = 'http://localhost:8080/api/ownings';
// const apiUrl = 'https://run.mocky.io/v3/b0f53ced-ad48-4a38-9e8d-96d15db0491a';

/**
 * Fetch data from the API.
 * @returns {Promise<Object>} The API response.
 */
export const fetchData = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
}

export async function deleteStock(id) {
    try {
        let response = await axios.delete(`${apiUrl}/${id}`);

        const deStock = response.data;
        console.log(deStock);
        return deStock;
    }
    catch(error){
        throw new Error('Error Fetching The Data');
    }
}
