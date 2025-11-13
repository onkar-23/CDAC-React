import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
 import './Student.css';

export default function Student() {

  const [Data, setData] = useState([]);
  const [FName,setFName]=useState("");
 const [LName,setLName]=useState("");
 const [DOB,setDOB]=useState("");
 const [Email,setEmail]=useState("");
  const base_url = "http://localhost:1234/student"

  const fetchAll = async () => {
    const response = await axios.get(base_url);
    console.log(response);
    setData(response.data);
  }

  const handleDelete = async (id)=>{
    await axios.delete(base_url+`/${id}`);
    fetchAll();
  }

  const handleAdd= async (e) =>{
    e.preventDefault();
    const data= {FName, LName, DOB, Email};
    await axios.post(base_url,data);
    fetchAll();
    setFName("");
    setLName("");
    setDOB("");
    setEmail("");
  }

  useEffect(() => {
    fetchAll();
  }, [])

  return (
    <div className='container'>
      <div className='table'>
        <table border="1" style={{ borderCollapse: 'collapse' }}>
          <thead className='thead'>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {
              Data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.FName}</td>
                  <td>{item.LName}</td>
                  <td>{item.DOB}</td>
                  <td>{item.Email}</td>
                  <td><button className='b' onClick={()=>handleDelete(item.id)}> Delete</button></td>
                </tr>
              ))
            }

          </tbody>
        </table>

      </div>

          <div className="form-container">
  <h2>Add Student</h2>
  <form onSubmit={handleAdd}>
    <div className="form-group">
      <label>First Name</label>
      <input type="text" name="FName" value={FName} onChange={(e)=>setFName(e.target.value)} />
    </div>
    <div className="form-group">
      <label>Last Name</label>
      <input type="text" name="LName" value={LName} onChange={(e)=>setLName(e.target.value)} />
    </div>
    <div className="form-group">
      <label>Date of Birth</label>
      <input type="date" name="DOB" value={DOB} onChange={(e)=>setDOB(e.target.value)} />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input type="email" name="Email" value={Email} onChange={(e)=>setEmail(e.target.value)} />
    </div>
    <div className="form-group">
      <button className='b' type="submit">Submit</button>
    </div>
  </form>
</div>


    </div>
  )
}
