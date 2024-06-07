import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginImage from "../assets/dist/img/Login.webp";
import {AlertError} from "../Dialogs/alertNotQuestions.js";
import '../assets/dist/css/login.css'

function Login() {

    const navigate = useNavigate();
    const {setCurrentUser, setUserToken} = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({__html: ""});

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({__html: ""});

        axiosClient
            .post("/login", {
                email : email+'@gmail.com',
                password,
            })
            .then(({data}) => {
                console.log('data response 200 ok', data.user, data.token)
                console.log(localStorage.getItem('TOKEN'))
                setCurrentUser(data.user);
                setUserToken(data.token);
                navigate('/incentive/qc_years')

            })
            .catch((error) => {
                if (error.response) {
                    AlertError('เกิดข้อผิดพลาด',error.response.data.message)
                    const finalErrors = Object.values(error.response.data.errors).reduce(
                        (accum, next) => [...accum, ...next],
                        []
                    );
                    setError({__html: finalErrors.join("<br>")});
                }
                console.error(error);
            });
    };


    return (
        <div className={'hold-transition login-page'}>
            <div className="login-box">
                <div className="card">
                    <div className="card-body login-card-body">
                        <div className={'bg-dark'}>
                            <img src={LoginImage} alt="" width="100%"/>
                        </div>
                        <p className="login-box-msg text-dark text-bold mt-2" style={{fontSize: 30}}>เข้าสู่ระบบ</p>

                        <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="ชื่อผู้ใช้งานระบบ" name="email" onChange={(e) => setEmail(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="รหัสผ่าน" name={'password'} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="w-100">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        <i className="fa-solid fa-right-to-bracket mr-1"></i>เข้าสู่ระบบ
                                    </button>
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