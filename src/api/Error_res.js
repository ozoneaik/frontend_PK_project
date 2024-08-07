export const ErrorApi = (error) => {
    console.log('Error:', error.response ? error.response.status : 'Network Error');
    return {
        data: error.response ? error.response.data.message : 'เกิดข้อผิดพลาดกับ server กรุณาติดต่อผู้ดูแลระบบ',
        status: error.response ? error.response.status : 500,
    };
}