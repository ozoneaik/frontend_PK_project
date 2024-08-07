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

export const checkSavedApi = async (year,month) => {
    try{
        const {data,status} = await axiosClient.get(`/incentive/checkIncHd/${year}/${month}`);
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
}

export const UpdateQcMonthApi = async (inc_id,datas,data_team) => {
    try{
        const {data,status} = await axiosClient.post('/incentive/qc_month/update',{
            inc_id,datas,data_team
        });
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
}

export const StoreQcMonthApi = async (datas,NewData_team) => {
    try{
        const {data,status} = await axiosClient.post('/incentive/qc_month/store',{
            datas,NewData_team
        });
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
}