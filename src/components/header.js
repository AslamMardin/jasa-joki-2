import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <header id="header">
      <div className="container py-4">
        <h1 className="display-5"><Link to="/" className='text-decoration-none text-white'>Joki Web / SKRIPSI</Link></h1>
        <p>Pelayanan Sangat Cepat Dan Terpercaya</p>
        
      </div>
    </header>
  )
}

export default Header