import React, {useState, useEffect} from 'react'
import Header from '../header'
import Button from './form/button'
import Input from './form/input'
import swal from 'sweetalert';
import FormDashboard from './FormDashboard'

const Dashboard = () => {

    
    const [inputPasswd, setInputPasswd] = useState('')
    const [isValid, setIsValid] = useState(false)

     const handleSubmitLogin = async (e) => {
        e.preventDefault()
          let url = `https://jasa-joki-default-rtdb.`
            url += `asia-southeast1.firebasedatabase.app`
            url += `/passwordadmin.json`
        const response = await fetch(url)
        const dbPasswd = await response.json()
        if(inputPasswd == dbPasswd){
            setIsValid(true)
        }else {
            setIsValid(false)

            swal('system', 'password anda salah','warning')
        }
    }

  return (
    <div>
        <Header />
        <div className='container-fluid my-5'>
           <div className='row'>
             <div className='col-sm-12 col-md-3 p-3'>
                <form>
                  <Input type="password" caption="Kata Sandi" name="sandi" onChange={(e) => setInputPasswd(e.target.value)} >
                  </Input>
                  <Button type="submit" warna='dark' onClick={handleSubmitLogin}>Buka</Button>
                </form>
            </div>
           {isValid && <FormDashboard  />}
           </div>
        </div>
    </div>
  )
}

export default Dashboard