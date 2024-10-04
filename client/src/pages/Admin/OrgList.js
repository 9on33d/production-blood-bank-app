import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API'
import moment from 'moment'

const OrgList = () => {
  const [data, setData] = useState([])
  // find doners record
  const getDoners = async () => {
      try {
          const { data } = await API.get('/admin/org-list')
          // console.log(data)
          if(data?.success) {
              setData(data?.orgData)
          }
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getDoners();
  }, [])

  // delete function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt('Are you sure you want to delete?',"sure")
      if(!answer) return
      const { data } = await API.delete(`/admin/delete-org/${id}`)
      alert(data?.message)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
return (
  <Layout>
    <div className='container mt-4'>
      <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Organisation Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Address</th>
              <th scope='col'>Website</th>
              <th scope='col'>Date</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record?._id}>
                <td>{record?.organisationName + " (Org.)"}</td>
                <td>{record?.email}</td>
                <td>{record?.phone}</td>
                <td>{record?.address}</td>
                <td>{record?.website}</td>
                <td>{moment(record?.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(record?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  </Layout>
)
}

export default OrgList