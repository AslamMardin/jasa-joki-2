import React, {useState, useEffect} from 'react'
import Header from '../header'
import Button from './form/button'
import Input from './form/input'
import swal from 'sweetalert';



const FormDashboard = () => {

    


    const [pelanggans, setPelanggans] = useState([])
    const [loading, setLoading] = useState(true)
    const [historys, setHistorys] = useState([])
    const [inputs, setInputs] = useState({
        selectHistory :'',
        inputHistory : ''
    })
    const [validAdd, setValidAdd] = useState(false)
    const [aktifAplikasi, setAktifAplikasi] = useState(null)



    const getAktifAplikasi = async () => {
      let url = `https://jasa-joki-default-rtdb.`
     url += `asia-southeast1.firebasedatabase.app`
     url += `/aktifkan/`
     url += `-NA3TWcN47E5vrU9Cnod.json`
     const response = await fetch(url)
     const data = await response.json()
     setAktifAplikasi(data.aktif)
}
    useEffect(() => {
        getPelanggan()
    },[pelanggans])
    getAktifAplikasi()



     const getDate = () =>{
        const dateObj =  new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
        }))
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    }

   
    
    const getPelanggan = async () => {
        let url = `https://jasa-joki-default-rtdb.`
            url += `asia-southeast1.firebasedatabase.app`
            url += `/pelanggan.json`
    try {
      const response = await fetch(url);
    const data = await response.json()
    const initPelanggans = []
    for (let prop in data){
      initPelanggans.push({
        id:prop,
        nama:data[prop].nama,
        jurusan:data[prop].jurusan,
        npm:data[prop].npm,
        nomor:data[prop].nomor,
        judul:data[prop].judul,
        kampus:data[prop].kampus,
        tanggal:data[prop].tanggal,
        isAktif:data[prop].isAktif,
        pakets:data[prop].pakets
      })
    }
    setPelanggans(initPelanggans);
    }catch(e)
    {
      console.log(e)
    }finally{
      setLoading(false)
    }
  } 

  const getHistory = async (idPelangganID) => {
      let url = `https://jasa-joki-default-rtdb.`
            url += `asia-southeast1.firebasedatabase.app`
            url += `/history.json`

            try {
                const response = await fetch(url)
                const data = await response.json()
                const initHistory = []
                for(let prop in data)
                {
                    if(data[prop].id == idPelangganID){
                        initHistory.push({
                            id:prop,
                            idPelanggan:data[prop].id,
                            pesan:data[prop].pesan,
                            waktu:data[prop].waktu
                        })
                    }
                }

                setHistorys(initHistory)
            } catch (error) {
                console.log(error)
            }

  }

  const handleInputChange = (e) => {
        if(e.target.name == "selectHistory"){
            if(e.target.value == "Pilih Client"){
                setValidAdd(false)
            }else {
                setValidAdd(true)
            }
            let idPelangganID = e.target.value
            getHistory(idPelangganID)
        }
      setInputs({...inputs, [e.target.name]:e.target.value})
  }

  const handleAddHistory = async () => {
    let url = `https://jasa-joki-default-rtdb.`
    url += `asia-southeast1.firebasedatabase.app`
    url += '/history.json'
    const newData = {
        id:inputs.selectHistory,
        pesan:inputs.inputHistory,
        waktu: getDate()
    }

    const response = await fetch(url, {
        method:"post",
        body:JSON.stringify(newData)
    })
    if(response.ok){
        setHistorys([...historys, newData])
    }
    
  }

  const handleDeleteHistory =  ({id, pesan}) => {
    swal({
  title: "anda yakin ?",
  text: "data hstory"+pesan+" akan dihapus!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
      deleteHistory(id)
    swal("data berhasil dihapus", {
      icon: "success",
    });
  } else {
    swal("data "+pesan+" tidak jadi dihapus!");
  }
});
  }

  const deleteHistory = async (id) => {
     let url = `https://jasa-joki-default-rtdb.`
        url += `asia-southeast1.firebasedatabase.app`
        url += `/history/`
        url += `${id}.json`
        try {
              const response = await fetch(url, {
                    method:"DELETE"
            })
            if (response.ok) {
                swal("berhasil!", "berhasil mendelete", "success");
                setHistorys(historys.filter(history => history.id !== id))
            }else {
                swal("kesalahan!", "terjadi kesalahan", "error");
            }
        }catch(e){
            swal("kesalahan!", "terjadi kesalahan", "error");
        }
  }


    const handleChangeAktif = async (e,id) => {
        let url = `https://jasa-joki-default-rtdb.`
        url += `asia-southeast1.firebasedatabase.app`
        url += `/pelanggan/`
        url += `${id}.json`

        try{
            const nilai = e.target.checked;
            const response = await fetch(url, {
            method:"PATCH",
            body:JSON.stringify({isAktif : nilai })
        })
        }catch(e){
            console.log('Error :' + e)
        }
    }

    const deletePelanggan = async (id) => {
 let url = `https://jasa-joki-default-rtdb.`
        url += `asia-southeast1.firebasedatabase.app`
        url += `/pelanggan/`
        url += `${id}.json`


        let url1 = `https://jasa-joki-default-rtdb.`
        url1 += `asia-southeast1.firebasedatabase.app`
        url1 += `/history.json`
        try {
       
       
              const response = await fetch(url, {
                    method:"DELETE"
            })
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                swal("berhasil!", "berhasil menambah", "success");
                 const responHistory = await fetch(url1)
        const dataHistory = await responHistory.json();
        const initHistory = []
        for(let i in dataHistory){
            initHistory.push({
                id:i,
                idPelanggan:dataHistory[i].id,
                pesan:dataHistory[i].pesan,
                waktu:dataHistory[i].waktu,
            })
        }
        const filterHistory = initHistory.filter(item => {
            return item.idPelanggan === id
        }).map(item => {
            deleteHistory(item.id)
        })
            }else {
                swal("kesalahan!", "terjadi kesalahan", "error");
            }
        }catch(e){
            swal("kesalahan!", "terjadi kesalahan", "error");
        }
    }

    const handleDeletePelanggan = async (e,{id, nama}) => {
        e.preventDefault()
        swal({
        title: "Anda Yakin?",
        text: "Ingin mengahpus "+nama+"!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            deletePelanggan(id)
            } else {
                swal("data "+nama+" tidak jadi dihapus!");
            }
        });
    }

    const handleChangeAktifAplikasi = async (e) => {
        console.log('ok')
        let url = `https://jasa-joki-default-rtdb.`
        url += `asia-southeast1.firebasedatabase.app`
        url += `/aktifkan/`
        url += `-NA3TWcN47E5vrU9Cnod.json`
        
            const response = await fetch(url, {
           method:"PATCH",
            body : JSON.stringify({aktif:e.target.checked})
            })
    
    }

    

 
   


  return (
    <div className='col-sm-12 col-md-8'>
                <div className='bg-white p-3 shadow-sm border rounded'>
                    <p className='text-success fw-bold'><i className="bi bi-people-fill"></i> Konfirmasi Pelanggan</p>
                    {pelanggans.map((pelanggan,i) => (
                      <div className="row mb-1 py-2 shadow-sm" key={i} style={{borderLeft: "5px solid #412abe"}}>
                        <div className='w-full d-flex justify-content-between align-items-center pb-2'>
                            <div className='text-dark w-75'>
                                <h6 className='m-0' style={{fontSize:"12px"}}>{pelanggan.nama} - <span className='text-danger'>{pelanggan.npm}</span></h6>
                                <p className='m-0' style={{fontSize: "12px"}}>{pelanggan.judul}</p>
                                
                            </div>
                             <div className="form-check form-switch w-25 d-flex justify-content-center align-items-center">
                                <input defaultChecked={pelanggan.isAktif} className="form-check-input" type="checkbox" role="switch" onClick={(e) => handleChangeAktif(e,pelanggan.id)} />
                                <label className={`form-check-label fw-bold ${pelanggan.isAktif ? 'text-success' : 'text-danger'}`}> <i className={`bi bi-check2-circle`}></i></label>
                            </div>
                        </div>
                        <div className='row'>
                             <h6 className='m-0' style={{fontSize:"12px"}}>Paket : </h6>
                            <ul style={{listStyle : "none", fontSize:"12px"}}>
                                {pelanggan.pakets.map(paket => (
                                    <li key={paket.id}><i className="bi bi-box"></i>  {paket.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span style={{fontSize:"12px"}}>
                                <i className="bi bi-building"></i> {pelanggan.kampus}
                                <br />
                                <a href="" className='text-danger' onClick={(e) => handleDeletePelanggan(e,pelanggan)}><i className="bi bi-trash-fill"></i> Hapus</a>
                            </span>
                            <span style={{fontSize:"10px"}}>
                                <i className="bi bi-whatsapp"></i> {pelanggan.nomor}
                                <br />
                                <i className="bi bi-boxes"></i> {pelanggan.jurusan}
                            </span>
                        </div>
                      </div>  
                    ))}
                  

                    <p className='mt-4 text-success fw-bold'><i className="bi bi-clock-history"></i> History</p>
                     <select className="form-select" name="selectHistory" aria-label="Pilih Client" onClick={handleInputChange}>
                         <option defaultValue>Pilih Client</option>
                        {pelanggans.filter(pelanggan => pelanggan.isAktif === true)
                        .map((pelanggan,i) => (
                         <option value={pelanggan.id} key={i}>{pelanggan.nama.toLowerCase()}</option>
                        ))}
                    </select>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>log</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {historys.map((history,i) => (

                                <tr key={i}>
                                <td>{i+1}</td>
                                <td>{history.pesan}</td>
                                <td>
                                    <Button type='button' warna="danger"><i className="bi bi-trash"  onClick={() => handleDeleteHistory(history)}></i></Button>
                                </td>
                            </tr>
                                ))}
                                {validAdd && (
                                <tr>
                                <td></td>
                                <td>
                                    <input type="text" name="inputHistory" className='form-control' onChange={handleInputChange} placeholder='Tambah History' />
                                </td>
                                <td>
                                        <Button type='button' warna="success" onClick={handleAddHistory}><i className="bi bi-plus"></i></Button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>

                    <p className='mt-4 text-success fw-bold'><i className="bi bi-gear"></i>  Setting</p>
                    <div className="form-check">
                    <input className="form-check-input" defaultChecked={aktifAplikasi} onChange={(e) => handleChangeAktifAplikasi(e)} type="checkbox"  id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                       Aktifkan Aplikasi
                    </label>
                    </div>
                </div>
            </div>
  )
}

export default FormDashboard