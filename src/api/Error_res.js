export const ErrorApi = (error) => {
    let message = 'เกิดข้อผิดพลาดกับ server กรุณาติดต่อผู้ดูแลระบบ';
    console.log('Error:', error.response ? error.response.status : 'Network Error');
    if (error.response){
        if (error.response.data.message){
            message = error.response.data.message;
        }
    }
    return {
        data : message,
        status: error.response ? error.response.status : 500,
    };
}