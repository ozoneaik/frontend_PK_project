import axiosClient from "../axios.js";
import {ErrorApi} from "./Error_res.js";

export const ProductsApi = async () => {
    try {
        const {data, status} = await axiosClient.get('/product');
        return {data, status};
    } catch (error) {
        return ErrorApi(error);
    }
}