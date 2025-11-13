import React,{useState,useEffect} from 'react';
import axios from 'axios';

export default function() {
    const base_url ="http://localhost:12345";
    const [data,setdata]=useState([]);
    const [Name,setName]= useState("");
    const [Product,setProduct]= useState("");
    const [amount,setAmount]=useState("");


    const fetchAll = async () =>{
        const response = await axios.get(base_url+'/get-customers');
        console.log(response.data);
        setdata(response.data);

    }

    const handleDelete = async (id)=>{
        await axios.delete(base_url+`/delete-customers/${id}`);
        fetchAll();
    }

   const handleAdd = async (e) => {
    e.preventDefault();
    const customer ={Name,Product,amount};
    await axios.post("http://localhost:12345/add-customers",customer);
    fetchAll();
   }

    useEffect(()=>{
        fetchAll();
    },[])

  return (
    <div>

        <div className='from'>
            <form onSubmit={handleAdd}>
            <input placeholder='Name' type='text' name='Name' value={Name} required onChange={(e)=>setName(e.target.value)}/>
            <input placeholder='Product' type='text' name='Product' value={Product} required onChange={(e)=>setProduct(e.target.value)}/>
            <input placeholder='Amount' type='number' name='Amount' value={amount} required onChange={(e)=>setAmount(e.target.value)}/>
            <button type='submit' >Add</button>
            </form>


        </div>
        <div className='table'>
            <div
                class="table-responsive"
            >
                <table
                    class="table table-primary" border="1" style={{borderCollapse :'collapse'}}
                >
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Product</th>
                            <th scope="col">Amount</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                      {
                        data.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.Name}</td>
                                <td>{item.Product}</td>
                                <td>{item.amount}</td>
                                <td><button onClick={()=>handleDelete(item.id)}>Delete</button></td>
                            </tr>
                        ))
                      }
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
  )
}
