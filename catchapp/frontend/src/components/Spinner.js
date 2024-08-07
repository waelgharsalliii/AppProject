import React from "react";

const Spinner = () => {
    const style={
        width:'3rem',
        height:'3rem'
    }
  return (
    <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-grow text-primary" style={style}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
  );
};

export default Spinner;
