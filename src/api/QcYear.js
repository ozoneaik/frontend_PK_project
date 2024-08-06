import axiosClient from "../axios.js";

export const QcYearListApi = async () => {
    try {
        const {data,status} = await axiosClient.get('/incentive/list-year');
        return {data,status};
    }catch (error){
        console.log('Error:', error.response ? error.response.status : 'Network Error');
        return {
            data: error.response ? error.response.data.message : 'เกิดข้อผิดพลาดกับ server กรุณาติดต่อผู้ดูแลระบบ',
            status: error.response ? error.response.status : 500,
        };
    }
};

export const QCYearDataListApi = async (year) => {
    try {
        const {data,status} = await axiosClient.get(`/incentive/qc_year/${year}`);
        return {data,status};
    }catch (error){
        console.log('Error:', error.response ? error.response.status : 'Network Error');
        return {
            data: error.response ? error.response.data.message : 'เกิดข้อผิดพลาดกับ server กรุณาติดต่อผู้ดูแลระบบ',
            status: error.response ? error.response.status : 500,
        };
    }
}

export const AddYearApi = async (year) => {
    try {
        const {data,status} = await axiosClient.post(`/incentive/add-year`,{year});
        return {data,status};
    }catch (error){
        console.log('Error:', error.response ? error.response.status : 'Network Error');
        return {
            data: error.response ? error.response.data.message : 'เกิดข้อผิดพลาดกับ server กรุณาติดต่อผู้ดูแลระบบ',
            status: error.response ? error.response.status : 500,
        };
    }
}