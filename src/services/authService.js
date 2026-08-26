import api from "../api/axios"


export const login = async (loginData) => {

    const response = await api.post("/auth/login", loginData);

    return response.data;

};

export const register = async (registerData) => {

    const response = await api.post("/auth/register", registerData);

    return response.data;

};

export const forgotPassword = async (email) => {

    const response = await api.post("/auth/forgot-password", email);

    return response.data;

};

export const resetPassword = async (resetData) => {

    const response = await api.post("auth/reset-password", resetData);

    return response.data;

};

export const deleteUser = async (userId) => {

    const response = await api.post("/auth/delete-user");

    return response.data;

}
