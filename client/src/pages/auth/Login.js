import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'

const Login = () => {
  const {loading, error} = useSelector(state => state.auth)
  return (
    <>
    {error && <span>{alert(error)}</span>}
    {loading ? <Spinner/> : (
      <div className="row g-0">
        <div className="col-md-6 form-banner">
          <img
            src="./assets/images/banner1.jpg" alt="loginImage"/>
        </div>
        <div className="col-md-6 form-container">
          <div className='light-effect'></div>
          <Form 
            submitBtn={"Login"} 
            formTitle={"Login Page"} 
            formType={"login"}
          />
        </div>
      </div>
    )}
    </>
  )
}

export default Login