import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import NoPreview from '../../assets/dist/img/NoPreview.png'
import {AlertError} from "../../Dialogs/alertNotQuestions.js";
import axios from "axios";


function Add_product_qc() {

    const [pid, setPid] = useState("");
    const [pname, setPname] = useState("");
    const [levelid, setLevelId] = useState("");
    const [timeperpcs, setTimeperpcs] = useState();

    const [tokenProduct, setTokenProduct] = useState('');

    const [p_image, setP_image] = useState(NoPreview);


    useEffect(() => {
        flatpickr('#product_rate',{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i:s",
            time_24hr: true,
            confirmText: "OK ",
            enableSeconds: true,
            onChange: function (selectedDates, dateString) {
                setTimeperpcs(dateString)
            }
        });

        axiosClient.post('https://pkapi.pumpkin.tools/api/login',{
            username: 'B67132',
            password: 'G_211044g'
        },{
            headers: {
                'Accept': 'application/json'
            }
        }).then(({data,status}) => {
            console.log(data.token,status);
            setTokenProduct(data.token);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/product/store", {
                pid,
                pname,
                levelid,
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
                    AlertError('error'+error.response.status,error.response.data.message)
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


    const ChangeImage = (e)=>{
        let newPid = e.target.value;
        setPid(newPid)
        setP_image(`https://images.dcpumpkin.com/images/product/500/${newPid}.jpg`);
        getProductName(newPid);
    }

    const getProductName = (newPid) => {
        axios.get(`https://pkapi.pumpkin.tools/api/get_product_data/${newPid}`,{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenProduct}`
            }
        }).then(({data,status}) => {
            console.log(data.pname);
            setPname(data.pname)

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Content header={'ข้อมูลสินค้า QC'} header_sub={'เพิ่มรายการสินค้า'}>
                <div className={'card'}>
                    <div className={'card-body'}>
                        <div className={'image preview mb-3'}>
                            <h6 className={'text-bold'}>รูปสินค้า</h6>
                            <img src={p_image ? p_image : ''} alt="รูปจะแสดงเมื่อกรอกรหัสสินค้าที่ถูกต้อง" style={{ borderRadius: 20,border: 'solid #fd7a31 1px',maxWidth: '400px'}}
                            onError={(e) => e.target.src= NoPreview}/>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
                            <div className={'row'}>
                                <div className={'col-md-6 col-sm-12'}>
                                    <div className={'form-group'}>
                                        <label htmlFor="product_code">รหัสสินค้า <span className={'text-danger'}>*</span> </label>
                                        <input type="text" className={'form-control'} id={'product_code'}
                                               placeholder={'กรอกรหัสสินค้า'}
                                               name={'product_code'} onChange={(e) => ChangeImage(e)}/>
                                    </div>
                                    <div className={'form-group'}>
                                        <label htmlFor="product_level">ระดับความยาก <span className={'text-danger'}>*</span> </label>
                                        <select name="product_level" id="product_level"
                                                className={'form-control'}
                                                defaultValue={levelid || ''}
                                                onChange={(e) => setLevelId(e.target.value)}
                                        >
                                            <option value="" selected={true} disabled={true}>เลือก...</option>
                                            <option value="L001">Very Easy</option>
                                            <option value="L002">Easy</option>
                                            <option value="L003">Middle</option>
                                            <option value="L004">Hard</option>
                                            <option value="L005">Very Hard</option>
                                            <option value="L006">No QC</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'col-md-6 col-sm-12'}>
                                    <div className={'form-group'}>
                                        <label htmlFor="product_name">ชื่อสินค้า <span className={'text-danger'}>*</span> </label>
                                        <input type="text" className={'form-control'} id={'product_name'} placeholder={'กรอกชื่อสินค้า'}
                                               name={'product_name'} value={pname} disabled={true}/>
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