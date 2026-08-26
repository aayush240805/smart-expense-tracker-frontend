import React from 'react'
import api from '../api/axios'

export const getIncomes = async (filters) => {

  const response = await api.get("/incomes", {
    params: filters
  });

  return response.data;

}

export const createIncome = async (incomeData) => {

  const response = await api.post("/incomes", incomeData);

  return response.data;
};

export const getIncomeById = async (id) => {

  const response = await api.get(`/incomes/${id}`);

  return response.data;

};

export const updateIncome = async (id, expenseData) => {

  const response = await api.put(`/incomes/${id}`, expenseData);

  return response.data;

};

export const deleteIncome = async (id) => {

  const response = await api.delete(`/incomes/${id}`);

  return response.data;

};