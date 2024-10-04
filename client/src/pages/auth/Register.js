import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'

const Register = () => {
  const {loading, error} = useSelector(state => state.auth)
  return (
    <>
    {error && <span>{alert(error)}</span>}
    {loading ? <Spinner/> : (
      <div className='row g-0'>
        <div className='col-md-6 form-banner'>
          <img
            src='./assets/images/banner2.jpg'
            alt='registerImage'
            className='img-fluid'
          />
        </div>
        <div className='col-md-6 form-container'>
        <div className='light-effect'></div>
          <Form 
            submitBtn={"Register"} 
            formTitle={"Register"}
            formType={"register"} 
          />
        </div>
      </div>
    )}
    </>
  )
}

export default Register