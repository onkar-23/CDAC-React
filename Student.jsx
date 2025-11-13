import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import './Student.css';

export default function Student() {

  const [Data, setData] = useState([]);
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [DOB, setDOB] = useState("");
  const [Email, setEmail] = useState("");



  const base_url = "http://localhost:1234/student"

  const fetchAll = async () => {
    const response = await axios.get(base_url);
    console.log(response);
    setData(response.data);
  }

  const handleDelete = async (id) => {
    await axios.delete(base_url + `/${id}`);
    fetchAll();
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = { FName, LName, DOB, Email };
    await axios.post(base_url, data);
    fetchAll();
    setFName("");
    setLName("");
    setDOB("");
    setEmail("");
  }

  const [editId,setEditId] = useState("");
const handleEditInit = (item) => {
  setEditId(item.id);
  setFName(item.FName);
  setLName(item.LName);

  // Format DOB properly for input[type=date]
  const formattedDate = item.DOB ? new Date(item.DOB).toISOString().split('T')[0] : '';
  setDOB(formattedDate);

  setEmail(item.Email);
};


const handleUpdate = async (e) => {
  e.preventDefault();
  const data = { FName, LName, DOB, Email };
  await axios.put(`${base_url}/${editId}`, data);
  fetchAll();
  setFName("");
  setLName("");
  setDOB("");
  setEmail("");
  setEditId("");
};

  useEffect(() => {
    fetchAll();
  }, [])

  return (
    <div className='container'>



      <div className="form-container">
      <h2>{editId ? "Edit Student" : "Add Student"}</h2>

        <form onSubmit={editId ? handleUpdate : handleAdd}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="FName" value={FName} onChange={(e) => setFName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="LName" value={LName} onChange={(e) => setLName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="DOB" value={DOB} onChange={(e) => setDOB(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
           <button className='bf' type="submit">{editId ? "Update" : "Submit"}</button>
          </div>
        </form>
      </div>
      <div className='table-div'>
        <table className='table' >
          <thead className='thead'>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {
              Data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.FName}</td>
                  <td>{item.LName}</td>
                  <td>{new Date(item.DOB).toISOString().split('T')[0]}</td>
                  <td>{item.Email}</td>
                  <td><button className='bt' onClick={() => handleDelete(item.id)}> Delete</button></td>
                  <td><button className='bt' onClick={() => handleEditInit(item)}> Edit</button></td>
                </tr>
              ))
            }

          </tbody>
        </table>

      </div>


    </div>
  )
}
