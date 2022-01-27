import axios from 'axios';

export const getRequest = async (): Promise<any> => {
    console.log('requested');
    const url = 'http://localhost:3000/ok';
    return new Promise(async (resolve, reject) => {
        return axios({
            method: 'GET',
            url: url,
        }).then((response) => resolve(response.status))
            .catch(error => reject(error))
    });
}   