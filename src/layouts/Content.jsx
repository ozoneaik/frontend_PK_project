import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

// eslint-disable-next-line react/prop-types
function Content({children,header,header_sub}) {
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className={'content-wrapper'}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>{header}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">{header}</a></li>
                                    <li className="breadcrumb-item">{header_sub}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={'content'}>
                    <div className={'container-fluid'}>
                        {children}
                    </div>
                </section>
            </div>

        </>
    );
}

export default Content;