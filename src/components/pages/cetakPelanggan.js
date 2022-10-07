import React from 'react'
import ReactDOM from 'react-dom/client';

const CetakPelanggan = ({pelanggans,...props}) => {
   const {nama, nomor, npm, judul, tanggal, kampus, jurusan} = pelanggans
  return (
 <div className="bg-white p-3 my-3 shadow-sm rounded w-100 border">
            <table className="table border-0 text-capitalize">
        <thead>
            <tr className="bg-utama opacity-50">
            <th scope="col" colSpan="3" className="text-center text-white">Screen Shoot <i className="bi bi-upc-scan"></i></th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td colSpan="5" align="right">
                <span className="fw-bold" style={{fontSize:"11px"}}>{tanggal}</span>
                <small className="d-block text-sm"><i className="bi bi-person-circle"></i> {npm}</small>
            </td>
            </tr>
            <tr>
            <td scope="row" width="20%" colSpan="2">Nama</td>
            <td colSpan="3">{nama}</td>
            </tr>
             <tr>
            <td scope="row" colSpan="2">No Wa</td>
            <td colSpan="3">{nomor}</td>
            </tr>
             <tr>
            <td scope="row" colSpan="2">Jurusan</td>
            <td colSpan="3">{jurusan}</td>
            </tr>
            <tr>
            <td scope="row" colSpan="2">Judul</td>
            <td colSpan="3">{judul}</td>
            </tr>
             

            

            <tr className="bg-dark">
            <th scope="row" colSpan="5" className="text-center text-white">Paket</th>
            </tr>
            {props.jokis.map((item,i) => (
              <tr id="paket" key={i}>
            <td scope="row" align="center">{i+1}</td>
            <td colSpan="2">{item.name}</td>
            <td colSpan="2" align='center'><i className="bi bi-check2-circle text-success"></i></td>
            </tr>
              ))}
              <tr className="bg-dark">
            <th scope="row" colSpan="5"></th>
            </tr>
            <tr>
                <td colSpan="4"></td>
                <td align="right">
                    <strong>Total : Rp {props.formatRupiah(props.harga)}</strong>
                </td>
            </tr>
             
            <tr>
                <td align="right" colSpan="5">
                    <strong className="text-success"><i className="bi bi-exclamation-circle-fill"></i> screen shoot kemudian kirim via Whatsapp!</strong>
                </td>
            </tr>
            <tr>
            <td colSpan="5" align='left'>
                <small className="text-sm text-dark">Dari Kampus : <strong>{kampus}</strong></small>
            </td>
            </tr>
        </tbody>
        </table>
        </div>
  )
}

export default CetakPelanggan