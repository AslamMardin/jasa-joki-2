import Header from "./components/header";
import React, {useState,useEffect, useRef} from 'react';
import Footer from "./components/footer";
import Joki from "./joki";
import Guide from "./guide";
import Form from "./components/pages/form";
import axios from "axios";
import swal from 'sweetalert';




 

  const initialPakets = [
    {
      id:1,
      name:"Jurnal & Plagiasi",
      harga:250000
    },
        {
            id:2,
            name:"Proposal",
            harga:500000
        },
         {
            id:3,
            name:"Skripsi (Hasil & Tutup)",
            harga:1500000
        },
        {
          id:4,
          name:"Skripsi (Sempro, Hasil & Tutup)",
          harga:2500000
        },
        {
            id:5,
            name:"Program",
            harga:2500000
        },
        {
          id:6,
          name:"1 Paket (Skripsi & Program)",
          harga:4000000
      },
    ];


function App() {
  const [jokis, setJokis] = useState([])
  const [pakets,setPakets] = useState(initialPakets)
  const [harga, setHarga] = useState(0)
  const [sudahBeli, setSudahBeli] = useState(false)
   const [aktifAplikasi, setAktifAplikasi] = useState(false)
  let total = 0
  let url = `https://jasa-joki-default-rtdb.`
    url += `asia-southeast1.firebasedatabase.app`
    url += `/pelanggan.json`

const tambahPelanggan = async ({judul,kampus,nama,nomor,npm,jurusan, tanggal}) => {
      const newPelanggan = {
          nama,
          npm,
          judul,
          nomor,
          jurusan,
          kampus,
          tanggal,
          pakets: jokis,
          isAktif: false
      }
      let response = await fetch(url,{
          method:"post",
          body:JSON.stringify(newPelanggan)
      })

      if(!response.ok){
            swal("Kesalahan", "Maaf Terjadi Kesalahan", "error");
      }else {
          swal("Berhasil", "Terimah kasih, " + nama + " telah memakai Jasa Joki Kami", "success");
          setPakets(initialPakets)
              setJokis([])
              setSudahBeli(true)
      }
}

const addPelanggan =  (pelanggans) => {
  
        swal({
            title: "Anda Yakin?",
            text: "Kamu akan membeli paket dari kami!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
              tambahPelanggan(pelanggans)
            } else {
                swal("Rugi ki sodara tidak pakai jasa disini!");
            }
            });
}

 const handleAddJokis = (dataPaket) =>
 {
  const newJoki = [...jokis, dataPaket]
  newJoki.sort((a,b) => a.id - b.id)
  setJokis(newJoki)
  
 }

 const handleAddPaket = (paket) => {
        handleAddJokis(paket)
        setPakets(pakets.filter(item => item.id !== paket.id))
    }
    
 const handleDeleteJoki = (joki) => {
   // menmabag paket
   const newData = [...pakets, joki]
   newData.sort((a,b) => a.id - b.id)
   setPakets(newData)
   // menghapus paket
   const hapusJoki = jokis.filter(item => item.id !== joki.id)
  setJokis(hapusJoki)

 }



 const menghtungHarga = () => {
  jokis.map(joki => {
   total = parseInt(joki.harga) + parseInt(total)
   setHarga(total)
  })
}

 const formatRupiah = (harga) => {
    return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(harga)
  }

  const getAktifAplikasi = async () => {
         let url = `https://jasa-joki-default-rtdb.`
        url += `asia-southeast1.firebasedatabase.app`
        url += `/aktifkan/`
        url += `-NA3TWcN47E5vrU9Cnod.json`
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data)
        setAktifAplikasi(data.aktif)
    }



useEffect(() => {
    getAktifAplikasi()
   menghtungHarga()

   if(jokis.length == 0) {
    setHarga(0)
   }
},[setAktifAplikasi, jokis, harga])




  
  return (
    <>
     <Header />
          <div className="container-fluid">
            <div className="row my-5 bg-white rounded">
               {aktifAplikasi && <Guide />}
            </div>
          
             <div className="container">
            <div className="row my-5">
                 <div className="col-md-6 col-sm-12">
                 
            {aktifAplikasi ? (
                  <Form 
                   handleAddJokis={handleAddJokis} 
                   jokis={jokis} 
                   harga={harga} 
                   formatRupiah={formatRupiah} 
                   initialPakets={initialPakets} 
                   handleDeleteJoki={handleDeleteJoki}
                  pakets={pakets}
                  handleAddPaket={handleAddPaket}
                  addPelanggan={addPelanggan}
                  sudahBeli={sudahBeli}
                  />
                 ) : (
                  <div className="alert alert-warning" role="alert">
                  Maap, Aplikasi Belum diaktifkan! Hubungin pihak admin
                </div>
                 )}
              </div>
              <div className="col-sm-12  col-md-12 mt-3">
                  <div className="d-flex justify-content-center ">
                      <Joki name="Risal Muzakkar" img="ical.jpg"  status="Pendiri Workit" />
                  </div>
              </div>
             </div>
            </div>

           
          </div>
      <Footer />
    </>
  );
}

export default App; 
