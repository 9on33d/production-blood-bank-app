import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import { useSelector } from 'react-redux';
import InputType from '../../components/shared/Form/InputType';
import { MdCloudUpload } from 'react-icons/md';
// import moment from 'moment';
const UserDetails = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    bloodGroup: "",
    height: "",
    weight: "",
  });

  const { user } = useSelector((state) => state.auth);

  const fetchImages = async () => {
    try {
      const res = await API.get("/images");
      if (res.data.success) {
        setAllImages(res.data.data);
      } else {
        setAllImages([]);
        console.error("Error fetching images:", res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error fetching images");
      setAllImages([]);
    }
  };

  // Route to fetch  images and data for single user
  const getDonars = async () => {
    try {
      const { data } = await API.get("/images");
      if (data?.success) {
        setData(data?.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
  }

  };
  // delete images
  // const handleDelete = async (id) => {
  //   try {
  //     const res = await API.delete(`/images/${id}`);
  //     if (res.data.success) {
  //       fetchImages();
  //       console.log('Delete successful:', res.data.message);
  //       window.location.reload();
  //     } else {
  //       console.error('Delete failed:', res.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error occurred during delete:', error.response ? error.response.data : error.message);
  //   }
  // };


const handleUpdate = async () => {
  if (!editingId) {
    alert('Please click the Edit button before updating.');
    return; // Stop the function execution if there's no editingId
  }

  const imageData = { ...formData, imageUrl: img };
  
  try {
    const res = await API.put(`/images/${editingId}`, imageData);
    if (res.data.success) {
      // console.log('Update successful:', res.data.data);
      setEditingId(null); // Reset the editing ID
      setImg(""); // Clear the image after the update
      setFormData({
        name: "",
        age: "",
        gender: "male",
        bloodGroup: "",
        height: "",
        weight: "",
      }); // Reset form after update
      fetchImages(); // Refresh images after the update
      window.location.reload();
    } else {
      console.error('Update failed:', res.data.message);
    }
  } catch (error) {
    console.error('Error occurred during update:', error.response ? error.response.data : error.message);
  }
};

  const imagebase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    if (!file.type.startsWith('image/')) {
      console.error("Please upload a valid image file");
      return;
    }

    const image = await imagebase64(file);
    setImg(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, gender, bloodGroup, height, weight } = formData;

    if (!name || !age || !gender || !bloodGroup || !height || !weight || !img) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await API.post('/create-inventory', {
        ...formData,
        userId: user._id,
        imageUrl: img, // Send the image along with form data
      });

      console.log('Donor created successfully', response.data);
      // Reset formData and image after submission
      setFormData({
        name: "",
        age: "",
        gender: "male",
        bloodGroup: "",
        height: "",
        weight: "",
      });
      window.location.reload();
      setImg(""); // Clear the uploaded image
      fetchImages(); // Refresh images or data if necessary
    } catch (error) {
      console.error('Error creating donor:', error);
      alert(error.response?.data?.message || "Error creating donor");
    }
  };

  useEffect(() => {
    getDonars();
    fetchImages();
  }, []);
  
  
  return (
    <Layout>
      <div className="container ms-2">
        <div className="row">
          <div className="col-md-3 media">
            <div className="profile-picture">
              <div className="upload-box">
                {allImages.length > 0 && (
                  <img key={allImages[0]._id} src={allImages[0].imageUrl} alt="img" height={"250px"} width={"250px"} />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h4
              className='ms-4'
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop'
              style={{ cursor: 'pointer' }}
            >
              <i className='fa-solid fa-plus text-success py-4'></i>
              Add User Details
            </h4>
            <table className='user-table'>
              <thead>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Age</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Height</th>
                  <th scope='col'>Weight</th>
                  <th scope='col'>Blood Group</th>
                </tr>
              </thead>
              <tbody>
                {/* fetch 1 record */}
                {data?.length > 0 &&(
                  <tr key={data[0]._id}>
                    <td>{data[0].name}</td>
                    <td>{data[0].age}</td>
                    <td>{data[0].gender}</td>
                    <td>{data[0].height}</td>
                    <td>{data[0].weight}</td>
                    <td>{data[0].bloodGroup}</td>
                  </tr>
                )}
                
              </tbody>
            </table>
            <div className='donar-modal'>
              <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">Manage Donor Record</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body d-flex">
                      <div className="form-container-donar">
                        <InputType
                          labelText={'Name'}
                          labelFor={'name'}
                          inputType={'text'}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <InputType
                          labelText={'Age'}
                          labelFor={'age'}
                          inputType={'number'}
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                        <div className='d-flex mb-3'>
                          Gender: &nbsp;
                          <div className='form-check ms-3'>
                            <input
                              type='radio'
                              className='form-check-input'
                              name='gender'
                              checked={formData.gender === 'male'}
                              value={"male"}
                              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            />
                            <label htmlFor='in' className='form-check-label'>Male</label>
                          </div>
                          <div className='form-check ms-3'>
                            <input
                              type='radio'
                              className='form-check-input'
                              name='gender'
                              checked={formData.gender === 'female'}
                              value={"female"}
                              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            />
                            <label htmlFor='out' className='form-check-label'>Female</label>
                          </div>
                        </div>
                        <InputType
                          labelText={'Height'}
                          labelFor={'height'}
                          inputType={'number'}
                          value={formData.height}
                          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        />
                        <InputType
                          labelText={'Weight'}
                          labelFor={'weight'}
                          inputType={'number'}
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                        <div className='d-flex mb-3'>
                          Blood Group: &nbsp;
                        </div>
                        <select className='form-select mb-3'
                          aria-label='Default select example'
                          value={formData.bloodGroup}
                          onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}>
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
                      </div>
                      <div className="image-container-donar">
                        <form>
                          <label htmlFor="uploadImage">
                            <div className="uploadBox">
                              <input type="file" id="uploadImage" onChange={handleUploadImage} />
                              {img ? <img src={img} alt="img" /> : <MdCloudUpload />}
                            </div>
                          </label>
                        </form>
                      </div>
                    </div>
                    <div className="modal-footer">
                      {!data[0] ? <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button> : null}
                      {data[0] ? <button className='btn btn-warning ms-2' onClick=
                      {() => 
                      {
                        if (data[0])
                        {
                          setFormData
                          ({
                            name: data[0].name,
                            age: data[0].age,
                            gender: data[0].gender,
                            bloodGroup: data[0].bloodGroup,
                            height: data[0].height,
                            weight: data[0].weight,
                          });
                          setImg(data[0].imageUrl); // Load the existing image
                          setEditingId(data[0]._id.toString()); // Make sure this is a string
                        }
                      }}>
                        Edit
                      </button>: null}
                      {data[0] ? <button type="button" className="btn btn-primary ms-2" onClick={handleUpdate}>Update</button> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default UserDetails;
