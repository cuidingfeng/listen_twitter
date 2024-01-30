import axios from 'axios';

export const getUrl = (url, params) => {
    return axios.get(`/api/${url}/`, { params })
        .then(response => response.data);
}

export const push = (url, params) => {
    
    return axios.post(`/api/${url}/`, params)
        .then(response => response.data);
}