import React from 'react'

const Joki = ({name, status = "Web ", ilmus, ...props}) => {
  return (
    <div className="card shadow-sm py-5 rounded px-3 text-center" style={{width: "18rem", border:"none"}}>
        <img src={`/img/${props.img}`} className="rounded-circle mx-auto img-sm" alt="aslam" width="100" height="100" />
        <div className="card-body">
            <h4 className="card-title mb-0">{name}</h4>
            <small className="fw-bold text-black-50">{status}</small>
          
        </div>
    </div>
  )
}

export default Joki