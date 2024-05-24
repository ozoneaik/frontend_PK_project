import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import '../../assets/plugins/select2/css/select2.min.css';
import '../../assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';
import '../../assets/plugins/select2/js/select2.full.min.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";


function Add_product_qc() {

    const [pid, setPid] = useState("");
    const [pname, setPname] = useState("");
    const [le_id, setLe_id] = useState("");
    const [timeperpcs, setTimeperpcs] = useState();

    const [p_image, setP_image] = useState("https://images.dcpumpkin.com/images/product/500/");


    useEffect(() => {
        $('.select2').select2({
            theme: 'bootstrap4'
        }).on('change', function (event) {
            setLe_id(event.target.value);
        });
        flatpickr('#product_rate',{

            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i:ss",
            time_24hr: true,
            confirmText: "OK ",
            onChange: function (selectedDates, dateString, instance) {
                setTimeperpcs(dateString)
            }
        });
    }, []);


    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/product/store", {
                pid,
                pname,
                le_id,
                timeperpcs
            })
            .then(({data,status}) => {
                if (status === 200){
                    Swal.fire({
                        icon: 'success',
                        text: data.message // นำข้อความผิดพลาดจาก API มาแสดงในข้อความ
                    });
                }
            })
            .catch((error) => {
                if (error.response) {
                    // ในกรณีที่มีข้อผิดพลาดจาก API
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: error.response.data.message // นำข้อความผิดพลาดจาก API มาแสดงในข้อความ
                    });
                } else {
                    // ในกรณีที่มีข้อผิดพลาดอื่นๆ เช่นการเชื่อมต่อเครือข่าย
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: 'An unexpected error occurred. Please try again later.'
                    });
                }
                console.error(error);
            });
    };


    const ChagneImage = (e)=>{
        let newPid = e.target.value;
        setPid(newPid)
        setP_image(`https://images.dcpumpkin.com/images/product/500/${newPid}.jpg`);
    }

    return (
        <>
            <Content header={'ข้อมูลสินค้า QC'} header_sub={'รายการ'}>
                <div className={'card'}>
                    <div className={'card-body'}>
                        <div className={'image preview'}>
                            <h6 className={'text-bold'}>รูปสินค้า</h6>
                            <img src={p_image} alt="รูปจะแสดงเมื่อกรอกรหัสสินค้าที่ถูกต้อง" style={{maxWidth: 'calc(100% - 100px)'}} />
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
                            <div className={'row'}>
                                <div className={'col-md-6 col-sm-12'}>
                                    <div className={'form-group'}>
                                        <label htmlFor="product_code">รหัสสินค้า * </label>
                                        <input type="text" className={'form-control'} id={'product_code'}
                                               name={'product_code'} onChange={(e) => ChagneImage(e)}/>
                                    </div>
                                    <div className={'form-group'}>
                                        <label htmlFor="product_level">ระดับความยาก * </label>
                                        <select name="product_level" id="product_level"
                                                className={'form-control select2'}
                                                onChange={(e) => setLe_id(e.target.value)}
                                        >
                                            <option value="" selected={true} disabled={true}>เลือก...</option>
                                            <option value="Very Easy">Very Easy</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Middling">Middling</option>
                                            <option value="Hard">Hard</option>
                                            <option value="Very Hard">Very Hard</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'col-md-6 col-sm-12'}>
                                    <div className={'form-group'}>
                                        <label htmlFor="product_name">ชื่อสินค้า * </label>
                                        <input type="text" className={'form-control'} id={'product_name'}
                                               name={'product_name'} onChange={(e) => setPname(e.target.value)}/>
                                    </div>
                                    <div className={'form-group'}>
                                        <label htmlFor="product_rate">ระยะเวลามาตรฐาน (HH:MM:SS)</label>
                                        <input type="time" step="2" className={'form-control'} style={{background: '#fff'}}
                                               id={'product_rate'}
                                               name={'product_rate'} onChange={(e) => setTimeperpcs(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className={'d-flex justify-content-center w-100'}>
                                <button type={"submit"} className={'btn btn-primary'}>บันทึก</button>
                            </div>
                        </form>


                    </div>
                </div>
            </Content>
        </>
    );
}

export default Add_product_qc;