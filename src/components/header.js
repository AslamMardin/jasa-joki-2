import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <header id="header">
      <div className="container py-4">
        <h1 className="display-5">
            <img src='/img/workit-removebg-preview.png' width={70} height={80} class="logo-joki" />
          <Link to="/" className='text-decoration-none text-white' style={{fontSize:"20px"}}>
            Jasa Pelayanan Skripsi & Program
          </Link>
          </h1>
        
      </div>
    </header>
  )
}

export default Header