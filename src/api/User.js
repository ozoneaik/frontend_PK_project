import axiosClient from "../axios.js";
import {ErrorApi} from "./Error_res.js";

export const UserListApi = async () => {
    try {
        const {data,status} = await axiosClient.get('/incentive/user-list');
        return {data,status};
    }catch (error){
        return ErrorApi(error);
    }
};