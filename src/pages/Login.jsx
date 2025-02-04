import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginImage from "../assets/dist/img/Login.webp";
import {AlertError} from "../Dialogs/alertNotQuestions.js";
import '../assets/dist/css/login.css'
import {LoginApi} from "../api/Auth.js";
import Spinner from "../components/Spinner.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faRightToBracket} from "@fortawesome/free-solid-svg-icons";

function Login() {

    const navigate = useNavigate();
    const {userToken,setCurrentUser, setUserToken} = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userToken){
            navigate('/incentive/qc_years')
        }
    }, [navigate, userToken]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        // AlertError('เกิดข้อผิดพลาด', 'ขณะนี้กำลังปิดปรับปรุงระบบ ขออภัยครับ')
        setLoading(true);
        LoginApi(email, password)
            .then(({data, status}) => {
                if (status === 200) {
                    setCurrentUser(data.user);
                    setUserToken(data.token);
                    navigate('/incentive/qc_years')
                } else {
                    AlertError('เกิดข้อผิดพลาด', data)
                }
            }).finally(() => {
                setLoading(false);
            }
        );
    };


    return (
        <div className={'hold-transition login-page'}>
            <div className="login-box">
                <div className="card">
                    <div className="card-body login-card-body">
                        <div className={'bg-dark'}>
                            <img src={LoginImage || ''} alt="" width="100%"/>
                        </div>
                        <p className="login-box-msg text-dark text-bold mt-2" style={{fontSize: 30}}>เข้าสู่ระบบ</p>
                        <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="ชื่อผู้ใช้งานระบบ" name="email"
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="รหัสผ่าน" name={'password'}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="w-100">
                                    {loading ? (
                                        <div className="btn btn-primary btn-block">
                                            <Spinner/>
                                        </div>
                                    ) : (
                                        <>
                                            <button type="submit" className="btn btn-primary btn-block">
                                                <FontAwesomeIcon icon={faRightToBracket} className={'mr-1'}/>
                                                <span>เข้าสู่ระบบ</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;