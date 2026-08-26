import React from 'react'
import api from '../api/axios';

export const getDashhboard = async (month, year) => {

    const response = await api.get("/dashboard", {
        params: {
            month,
            year
        },
    });

    return response.data;
};