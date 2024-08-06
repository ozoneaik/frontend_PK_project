import axiosClient from "../axios.js";

export const LoginApi = async (email, password) => {
    try {
        const { data, status } = await axiosClient.post("/login", {
            email: `${email}@gmail.com`,
            password,
        });
        return { data, status };
    } catch (error) {
        console.log('Error:', error.response ? error.response.status : 'Network Error');
        return {
            data: error.response ? error.response.data.message : 'เกิดข้อผิดพลาดกับ server กรุณาติดต่อผู้ดูแลระบบ',
            status: error.response ? error.response.status : 500,
        };
    }
};
