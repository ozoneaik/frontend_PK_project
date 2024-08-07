import axiosClient from "../axios.js";
import {ErrorApi} from "./Error_res.js";

export const QcLogApi = async (year,month,status_param) => {
    try{
        const {data,status} = await axiosClient.get(`/incentive/qc_month/${year}/${month}/${status_param}`)
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
}