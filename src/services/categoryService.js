import React from 'react'
import api from '../api/axios'

export const getExpenseCategories = async () => {

    const response = await api.get('/categories', {
        params: {
            type: "EXPENSE"
        }
    });

    return response.data;
}


export const getIncomeCategories = async () => {

    const response = await api.get("/categories", {
        params: {
            type: "INCOME"
        }
    });

    return response.data;

}