import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer" className="text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="lead mb-0">
              <Link to="/dashboard" as="button" className="text-decoration-none text-white">Joki Web / Skripsi</Link>
            </p>
            <p><span className="fw-bold">Hubungin Via Wa :</span> Admin (0853-2135-3455)</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer