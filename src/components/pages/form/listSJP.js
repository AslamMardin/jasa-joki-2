import React, {useState} from 'react'
import Button from './button';


const ListSJP = ({...props}) => {

    
    return (
        <ol className="list-group w-100">
            {props.pakets && props.pakets.map((paket,i) => (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                <div className="fw-bold">{paket.name}</div>
                    Rp. {props.formatRupiah(paket.harga)}
                </div>
                <Button type="button" warna="success" onClick={() => props.handleAddPaket(paket)}>
                    <i className="bi bi-clipboard-plus-fill"></i>
                </Button>
            </li>
            ))}
        </ol>
  )
}

export default ListSJP