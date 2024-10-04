import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import InputType from '../Form/InputType'
import API from '../../../services/API'

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in")
  const [bloodGroup, setBloodGroup] = useState("")
  const [quantity, setQuantity] = useState("")
  const [email, setEmail] = useState("")

  const {user} = useSelector(state => state.auth)

  // handle modal submit
  const handleModalSubmit = async () => {
    try {
      if(!bloodGroup || !quantity || !email){
        return alert("Please provide blood group and quantity")
      }
      const { data } = await API.post("/inventory/create-inventory", {
        inventoryType, 
        bloodGroup, 
        quantity, 
        email,
        name: user?.name,
        organisation: user?._id
      })
      if(data?.success){
        alert("New Record created successfully")
        window.location.reload()
      }
    } catch (error) {
      console.error("Error creating inventory:", error);
      alert(error.response.data.message);
    }
  }
  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Manage Blood Record</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    <div className='d-flex mb-3'>
                      Blood Type: &nbsp;
                      <div className='form-check ms-3'>
                        <input 
                          type='radio' 
                          className='form-check-input'
                          name='inRadio'
                          defaultChecked
                          value={"in"}
                          onChange={(e) => setInventoryType(e.target.value)}
                        />
                        <label htmlFor='in' className='form-check-label'>
                          IN
                        </label>
                      </div>
                      <div className='form-check ms-3'>
                        <input 
                          type='radio' 
                          className='form-check-input'
                          name='inRadio'
                          value={"out"}
                          onChange={(e) => setInventoryType(e.target.value)}
                        />
                        <label htmlFor='out' className='form-check-label'>
                          OUT
                        </label>
                      </div>
                    </div>
                <select className='form-select mb-3' 
                  aria-label='Default select example'
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}>
                    <option value="">Select Blood Group</option>
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                </select>
                <InputType
                  labelText={'Donar Email'}
                  labelFor={'email'}
                  inputType={'email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputType
                  labelText={'Quantity'}
                  labelFor={'quantity'}
                  inputType={'Number'}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Submit</button>
                </div>
            </div>
        </div>
      </div>

    </>
  )
}

export default Modal