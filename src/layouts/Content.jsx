import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import axiosClient from "../axios.js";

// eslint-disable-next-line react/prop-types
function Content({children,header,header_sub}) {
    const {userToken, setCurrentUser} = useStateContext();
    if (!userToken){
        return <Navigate to="/login" />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosClient.get('/me')
            .then(({ data }) => {
                setCurrentUser(data)
            })
    }, [setCurrentUser, userToken])

    
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className={'content-wrapper'}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            {/*<div className="col-sm-6">*/}
                            {/*    <h1>{header}</h1>*/}
                            {/*</div>*/}
                            <div className="col-sm-12">
                                <ol className="breadcrumb float-sm-left">
                                    <li className="breadcrumb-item"><a href="#">{header}</a></li>
                                    <li className="breadcrumb-item">{header_sub}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={'content m-0'}>
                    <div className={'container-fluid'}>
                        {children}
                    </div>
                </section>
            </div>

        </>
    );
}

export default Content;