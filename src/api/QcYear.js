import axiosClient from "../axios.js";
import {ErrorApi} from "./Error_res.js";

export const QcYearListApi = async () => {
    try {
        const {data,status} = await axiosClient.get('/incentive/list-year');
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
};

export const QCYearDataListApi = async (year) => {
    try {
        const {data,status} = await axiosClient.get(`/incentive/qc_year/${year}`);
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
}

export const AddYearApi = async (year) => {
    try {
        const {data,status} = await axiosClient.post(`/incentive/add-year`,{year});
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
}