import React from 'react'
import { Link } from "react-router-dom";
import Button from './components/pages/form/button';

const Guide = () => {
  return (
    <>
    <div className="col-sm-12 col-md-6 mb-5 mt-3 p-5  rounded">
   <h1 className="mb-2 pb-4 pl-2">Monitoring</h1>
   <p className='text-justify text-capitalize text-break text-wrap'>Monitoring merupakan hak akses Client untuk melihat seberapa perkembangan aplikasi beberapa minggu ini, Lakukan Monitoring Sekarang </p>
    <Link as="button" to="home" className="btn btn-lg btn-success btn-utama" style={{padding: "20px 40px"}}><i className="bi bi-eye"></i> Monitoring Sekarang</Link>
    </div>
  <div  className="col-sm-12 col-md-6 p-5 rounded">
     <h1 className="mb-2 pb-4 pl-2 border-bottom">Cara Daftar ?</h1>
    <ol className="text-capitalize text-break text-wrap">
        <li className='mt-1'>Jika kamu ingin manjoki disini silahkan isi biodata yang tersedia</li>
        <li className='mt-1'>setelah tekan cetak, kamu akan diberikan nota detail</li>
        <li className='mt-1'>Screen Shoot itu ! dan kirim via Whatsapp ke kontak Admin</li>
        <li className='mt-1'>Jika sudah distujui, kamu dapat meliat namamu tampil dihalaman monitoring setelah memasukan NPM</li>
    </ol>
  </div>
   
    </>
  )
}

export default Guide