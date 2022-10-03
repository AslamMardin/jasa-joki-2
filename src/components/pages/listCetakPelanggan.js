import React from 'react'

const ListCetakPelanggan = () => {
  return (
    <>
          <tr>
            <td colSpan="5" align="right">
                <span className="fw-bold">17/08/2022</span>
                <small className="d-block text-sm">20180510065</small>
            </td>
            </tr>
            <tr>
            <td scope="row" width="20%" colSpan="2">Nama</td>
            <td colSpan="3">aslam</td>
            </tr>
             <tr>
            <td scope="row" colSpan="2">No Wa</td>
            <td colSpan="3">085825587404</td>
            </tr>
            <tr>
            <td scope="row" colSpan="2">Judul</td>
            <td colSpan="3">SISTEM INFORMASI RESPPON NETZIEN BERBASIS WEBASLKDJKLASLJDASDLADJLSA</td>
            </tr>



            <tr className="bg-dark">
            <th scope="row" colSpan="5" className="text-center text-white">Paket</th>
            </tr>
            <tr>
            <th scope="row">1</th>
            <td colSpan="2">Skripsi</td>
            </tr>
              <tr className="bg-dark">
            <th scope="row" colSpan="5"></th>
            </tr>
            <tr>
                <td colSpan="4"></td>
                <td align="right">
                    Total : <strong>Rp 2.000.000</strong>
                </td>
            </tr>
             <tr>
                <td colSpan="4"></td>
                <td align="right">
                    <strong className="text-danger">Bisa bayar setengah!</strong>
                </td>
            </tr>
    </>
  )
}

export default ListCetakPelanggan