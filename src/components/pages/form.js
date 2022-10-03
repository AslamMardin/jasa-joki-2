import React, { useState } from 'react'
import Button from './form/button'
import Input from './form/input'
import ListSJP from './form/listSJP'
import ListJoki from './listJoki'
import axios from 'axios'

 import { Formik, useFormik } from 'formik';
 import * as Yup from 'yup';
import CetakPelanggan from './cetakPelanggan'


 



const Form = ({...props}) => {
    const [pelanggans, setPelanggans] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({
        errorPaket:''
    });
    
    const getDate = () =>{
        const dateObj =  new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
        }))
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    }
    
 
    
    
    const SignupSchema = Yup.object().shape({
        judul: Yup.string()
            .min(10, "Minimal 10 Karakter")
            .max(200, "Maksimal 200 Karakter")
            .required('Judul Harus Ada'),
        nama: Yup.string()
            .min(3, "Minimal 3 Karakter")
            .max(200, "Maksimal 200 Karakter")
            .required('Nama Harus Ada'),
        npm: Yup.number()
            .min(5, "Minimal 5 Karakter")
            .required('Npm Harus Ada'),
        jurusan: Yup.string()
            .min(5, "Minimal 5 Karakter")
            .required('Jurusan Harus Ada'),
        kampus: Yup.string()
            .min(5, "Minimal 8 Karakter")
            .required('Kampus Harus Ada'),
        nomor: Yup.number()
            .min(5, "Minimal 11 Karakter")
            .required('Nomor Telpon Harus Ada'),
        });

    const formik = useFormik({
        initialValues: {
            judul: '',
            nama: '',
            npm: '',
            jurusan: '',
            nomor: '',
            kampus: '',
            tanggal: getDate(),
        },
        validationSchema:SignupSchema,
        onSubmit: (values, {resetForm}) => {
            const {judul, nama, nomor, npm, tanggal, jurusan, kampus } = values
            const data = {
                judul, 
                nama, 
                npm, 
                nomor,
                jurusan,
                tanggal, 
                kampus
            }   

            if(props.jokis.length > 0){
                setErrors({errorPaket:""})
                setPelanggans(data);
                setIsValid(true)
                resetForm()
            }else {
                setErrors({errorPaket:"Anda Belum Memilih Paket"})
            }


        },
    });

    
  return (
    <div>
        <h2 className="mb-2 pb-4 pl-2 mt-5 border-bottom text-center text-uppercase">Isi Biodata</h2>
        <form onSubmit={formik.handleSubmit}>
            
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <Input name="nama" caption="Nama Lengkap" onChange={formik.handleChange} value={formik.values.nama}> 
                        {formik.errors.nama &&  <small className="text-danger fw-semi-bold m-1">{formik.errors.nama}</small>}
                    </Input>
                </div>
                <div className="col-sm-12 col-md-4">
                    <Input name="npm" caption="Npm" type="number" onChange={formik.handleChange} value={formik.values.npm}>
                        {formik.errors.npm &&  <small className="text-danger fw-semi-bold m-1">{formik.errors.npm}</small>}
                    </Input>
                </div>
                <div className="col-sm-12 col-md-4">
                    <Input name="nomor" caption="No Telpon" type="number" onChange={formik.handleChange} value={formik.values.nomor}>
                        {formik.errors.nomor &&  <small className="text-danger fw-semi-bold m-1">{formik.errors.nomor}</small>}
                    </Input>
                </div>
            </div>
            
             <div className="row">
                <div className="col-12">
                    <Input name="jurusan" caption="Jurusan" onChange={formik.handleChange} value={formik.values.jurusan}>
                        {formik.errors.jurusan &&  (
                        <small className="text-danger fw-semi-bold m-1">{formik.errors.jurusan}</small>
                        )}
                    </Input>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Input name="judul" caption="Judul" onChange={formik.handleChange} value={formik.values.judul}>
                        {formik.errors.judul &&  (
                        <small className="text-danger fw-semi-bold m-1">{formik.errors.judul}</small>
                        )}
                    </Input>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <Input name="kampus" caption="Kampus" onChange={formik.handleChange} value={formik.values.kampus}>
                        {formik.errors.kampus &&  (
                        <small className="text-danger fw-semi-bold m-1">{formik.errors.kampus}</small>
                        )}
                    </Input>
                </div>
            </div>
            <div className="row">
                <label htmlFor="pesan" className="form-label">Proposal / Skripsi / Jurnal</label>
                <div className="input-group mb-3">
                   <ListSJP {...props} />
                </div>
            </div>

            <div className="row px-3">
                <ListJoki {...props} />
                {errors.errorPaket.length !==0 && (
                    <div className="alert alert-warning" role="alert">
                    {errors.errorPaket}!
                    </div>
                )}
            </div>

            <div className="d-grid gap-2">
                <Button type="submit" warna="danger"><i className="bi bi-printer-fill"></i> Cetak</Button>
            </div>
        </form>


        {/* cetak pelanggan */}
        { (errors.errorPaket.length == 0 && pelanggans) && (
            <>
        <CetakPelanggan pelanggans={pelanggans} {...props} />
        <div className='row mt-3'>
            <div className="d-grid gap-2">
                {props.sudahBeli == false && (
                    <Button type="submit" warna="utama" isValid={isValid} onClick={() => props.addPelanggan(pelanggans)} ><i className="bi bi-plus-circle-fill"></i> Daftar</Button>
                )}
            </div>
        </div>
            </>
        )}

        </div>
        
  )
}

export default Form