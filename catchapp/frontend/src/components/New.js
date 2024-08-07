import React from "react";


const New =() => {
return (
    <div className="container-xxl bg-primary newsletter my-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container px-lg-5">
                <div className="row align-items-center" style={{Height: "250px"}}>
                    <div className="col-12 col-md-6">
                        <h3 className="text-white">Ready to get started</h3>
                        <small className="text-white">Diam elitr est dolore at sanctus nonumy.</small>
                        <div className="position-relative w-100 mt-3">
                            <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="text" placeholder="Enter Your Email" style={{Height: "48px"}} />
                            <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i className="fa fa-paper-plane text-primary fs-4"></i></button>
                        </div>
                    </div>
                    <div className="col-md-6 text-center mb-n5 d-none d-md-block">
                        <img className="img-fluid mt-5" style={{Height: "250px"}} src="img/newsletter.png" alt="new" />
                    </div>
                </div>
            </div>
        </div>
);
}

export default New;