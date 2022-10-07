import React from 'react'

const PelangganBox = ({pelanggans,historys,npmInput}) => {
  return (
    <>
   
    <div className="container">
        <div className="row">
            <div className="col-sm-12 col-md-6 offset-md-3">
                <p className="f-5 "><i className="bi bi-clock-fill"></i> Log</p>
                <ul className="list-group">
                    {pelanggans.filter(pelanggan => (pelanggan.isAktif === true && pelanggan.npm == npmInput))
                    .map(pelanggan => (

                    <li className="list-group-item" key={pelanggan.id}>
                        <div className="d-flex justify-content-between align-items-center">
                             <h6>
                                {pelanggan.nama}
                            </h6>
                        <span>  
                            <span className='text-sm text-end d-block fw-semibold m-0'>{pelanggan.jurusan}</span>
                            <span className='text-sm text-end text-secondary m-0'>{pelanggan.tanggal}</span>
                        </span>
                        </div>
                       
                        <div className="mb-1">
                            <ul className="list-unstyled text-dark" style={{fontSize: "12px"}}>
                            {historys.length == 0 && <b className='alert alert-danger d-block'>Aplikasi Anda Belum Dikerja</b>}
                        {historys.filter(item => item.idPelanggan === pelanggan.id).map((history, i) => (
                                <li className="d-flex justify-content-start align-items-center" key={i}>
                                    <i className="bi bi-clock-history text-success fw-bold fs-5"></i>
                                    <div className='p-2'>
                                        <span className='text-sm text-dark fw-bold d-block mx-1 my-0' style={{fontSize:"10px"}}>{history.waktu}</span>
                                        <span className="mx-1 my-0 fw-bold text-success" style={{fontFamily:"monospace"}}>{history.pesan}</span>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                             
                       
                    </li>
                    ))}
                  
                  
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-utama">
                    </li>
                    </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default PelangganBox