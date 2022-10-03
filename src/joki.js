import React from 'react'

const Joki = ({name, status = "Web Development", ilmus, ...props}) => {
  return (
    <div className="card shadow-sm py-5 rounded px-3 text-center" style={{width: "18rem", border:"none"}}>
        <img src={`/img/${props.img}`} className="rounded-circle mx-auto img-sm" alt="aslam" width="100" height="100" />
        <div className="card-body">
            <h4 className="card-title mb-0">{name}</h4>
            <small className="fw-bold text-black-50">{status}</small>
            <p className="card-text fs-6">
                <span className="badge bg-danger m-1">Front-End</span>
                <span className="badge bg-primary m-1">Back-End</span>
            </p>
            <div className="p-2 text-start border-top">
                {ilmus && ilmus.map((ilmu,i) => (
                    <small key={i} className="d-block py-1 text-justify text-capitalize"><i className="bi bi-check-all text-success fs-6"></i> {ilmu}</small>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Joki