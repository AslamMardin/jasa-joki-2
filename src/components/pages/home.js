import React, { useEffect, useState } from 'react'
import Footer from '../footer'
import Header from '../header'
import PelangganBox from './pelangganBox'


const Home = () => {
    const [totalPelanggan,setTotalPelanggan] = useState(0)
    const [pelanggans, setPelanggans] = useState([])
    const [historys, setHistorys] = useState([])
    const [loading, setLoading] = useState(true)
    
let url = `https://jasa-joki-default-rtdb.`
    url += `asia-southeast1.firebasedatabase.app`
    url += `/pelanggan.json`

  const getPelanggan = async () => {
    try {
      const response = await fetch(url);
    const data = await response.json()
    let total = 0
    const initPelanggans = []
    for (let prop in data){
      initPelanggans.push({
        id:prop,
        isAktif:data[prop].isAktif,
        nama:data[prop].nama,
        jurusan:data[prop].jurusan,
        npm:data[prop].npm,
        nomor:data[prop].nomor,
        judul:data[prop].judul,
        kampus:data[prop].kampus,
        tanggal:data[prop].tanggal,
      })
      if (data[prop].isAktif) {
        total +=1
      }
    }
    setTotalPelanggan(total)

    setPelanggans(initPelanggans);
    }catch(e)
    {
      console.log(e)
    }finally{
      setLoading(false)
    }
  } 

  const getHistory = async () => {
    let url = `https://jasa-joki-default-rtdb.`
    url += `asia-southeast1.firebasedatabase.app`
    url += `/history.json`
    const initHistory = [];
    const response = await fetch(url)
    const data = await response.json()
    for(let i in data)
    {
      initHistory.push({
        id:i,
        idPelanggan:data[i].id,
        pesan:data[i].pesan,
        waktu:data[i].waktu
      })
    }
    setHistorys(initHistory)
    
    
  }


 

  useEffect(() => {
    getPelanggan()
    getHistory()
  }, [])

  return (
    <>
    <Header />
   
   <section id="saldo-box">
      <div className="container mb-4">
        <div className="total-saldo">
          <p className="pt-4 ps-5 mb-0 d-block">Total Client</p>
          <h2 className="display-5 px-5 pb-3">
          {totalPelanggan} Orang
          </h2>
          <div className="d-flex justify-content-center">
            <p className="mini-saldo mini-saldo-pemasukan py-2">
           
            </p>
            <p className="mini-saldo mini-saldo-pengeluaran py-2">
           
            </p>
          </div>
        </div>
      </div>
    </section>
    {loading ? (
      <div className="row d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
        </div>
      </div>
    ) : (<PelangganBox 
      pelanggans={pelanggans} 
      historys={historys} 
      />
      )}

     
    <Footer />
    </>
  )
}

export default Home