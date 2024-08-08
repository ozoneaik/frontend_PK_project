import axiosClient from "../axios.js";
import {ErrorApi} from "./Error_res.js";

export const WorkdayListApi = async (year) => {
    try {
        if (!year){
            let d = new Date();
            year = d.getFullYear();
        }
        const {data, status} = await axiosClient.get(`/incentive/workday/list/${year}`);
        return {data, status};
    } catch (error) {
        return ErrorApi(error);
    }
}

export const StoreDayApi = async (wo_year, wo_month, workday) => {
    try {
        const {data, status} = await axiosClient.post('/incentive/workday/store', {
            wo_year, wo_month, workday
        });
        return {data, status};
    } catch (error) {
        return ErrorApi(error);
    }
}