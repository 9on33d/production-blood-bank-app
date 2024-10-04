import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const { user } = useSelector((state) => state.auth)
  return (
    <Layout>
        <div className='container'>
            <div className='d-flex flex-column mt-4'>
                <h1>Welcome Admin <i className='text-success'>{user?.name}</i></h1>
                <h3>Manage Blood Bank App</h3>
                <hr />
                <p>
                rong API Endpoint: The API you're calling is '/inventory/get-hospitals', but this component is called Donar. The endpoint seems to be fetching hospitals, not donors. Double-check that the endpoint is correct for what you're trying to display.Inconsistent Data: If you’re fetching hospitals but referring to it as donors in the component, this might cause confusion in the code and naming conventions. Make sure you’re dealing with the correct data structure.State and API Response: Use console.log statements to debug and ensure that the response from the API is what you're expecting. Check if data.hospitals is defined.
                </p>
            </div>
        </div>
    </Layout>
  )
}

export default AdminHome