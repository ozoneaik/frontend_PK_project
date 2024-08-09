import axiosClient from "../axios.js";
import {ErrorApi} from "./Error_res.js";

export const ErrorProductsApi = async (year,month) => {
    try {
        const {data, status} = await axiosClient.get(`/product/not-found/${year}/${month}`);
        return {data, status};
    } catch (error) {
        return ErrorApi(error);
    }
}