import axiosClient from "../axios.js";
import {ErrorApi} from "./Error_res.js";

export const LoginApi = async (email, password) => {
    try {
        const { data, status } = await axiosClient.post("/login", {
            email: `${email}@gmail.com`,
            password,
        });
        return { data, status };
    } catch (error) {
        return ErrorApi(error);
    }
};

export const LogoutApi = async () => {
    try {
        const { data, status } = await axiosClient.post('/logout');
        return { data, status };
    }catch (error){
        return ErrorApi(error);
    }
}
