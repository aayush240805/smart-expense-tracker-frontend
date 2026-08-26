import api from "../api/axios";

export const getMonthlyReport = async (month, year) => {

    const response = await api.get("/reports/monthly", {
        params: {
            month,
            year
        }
    });

    return response.data;

};

export const getCategoryWiseExpenses = async (month, year) => {

    const response = await api.get("/reports/category-wise-expense", {
        params: {
            month,
            year
        }
    });

    return response.data;

};

export const getBudgetReport = async (month, year) => {

    const response = await api.get("/reports/budget", {
        params: {
            month,
            year
        }
    });

    return response.data;

};