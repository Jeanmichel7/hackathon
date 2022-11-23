import React from 'react';
import axios from 'axios';

const apiClient = () => {
    const { REACT_APP_API_URL } = process.env;

    const axiosInstance = axios.create({
        baseURL: REACT_APP_API_URL,
        headers : {
            "x-api-key": 'sk_live_ae9979a6-d796-4604-bc7e-848467f11950',
        },
    });
  return (axiosInstance);
}

export default apiClient;