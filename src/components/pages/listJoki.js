import React from 'react'
import Button from './form/button'

const ListJoki = ({ jokis, ...props }) => {
  const getTanggal = () => {
    const dateObj = new Date()

    const hari = dateObj.getDay()
    const bulan = dateObj.getMonth()
    const tahun = dateObj.getFullYear()

    return `${hari}/${bulan}/${tahun}`
  }



  return (
    <>


      <table className="table">
        <thead>
          <tr className="bg-utama text-white">
            <th scope="col">#</th>
            <th scope="col">Paket</th>
            <th scope="col">Harga</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {jokis && jokis.map((joki, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{joki.name}</td>
              <td>Rp. {props.formatRupiah(joki.harga)}</td>
              <td>
                <Button warna="danger"  type="button" onClick={() => props.handleDeleteJoki(joki)}>-</Button>
              </td>
            </tr>
          ))}

          <tr className="bg-utama text-white">
            <td colSpan="2">
              Total:
            </td>
            <td colSpan="2">
              Rp. {props.formatRupiah(props.harga)}
            </td>
          </tr>

        </tbody>
      </table>
    </>
  )
}

export default ListJoki