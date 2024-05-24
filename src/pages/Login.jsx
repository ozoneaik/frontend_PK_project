import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios.js";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import LoginImage from "../assets/dist/img/Login.webp";

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
                email,
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
                                <input type="email" className="form-control" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" name={'password'} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="w-100">
                                    <button type="submit" className="btn btn-primary btn-block">เข้าสู่ระบบ</button>
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