import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './Book.css';

export default function Books() {
    const [Data,setData]=useState([]);
    const base_url="http://localhost:1234/books";
    const fetchAll = async()=>{
        const res = await axios.get(base_url);
        console.log(res.data);
        setData(res.data);

    }

    useEffect(()=>{
        fetchAll();
    },[])



    const [title,setTitle]=useState("");
    const [author,setAuthor]=useState("");
    const [pyear,setPyear]=useState("");

    const handleAdd = async(e)=>{
        e.preventDefault();
        const data = {title, author, pyear};
        await axios.post(base_url,data);
        fetchAll();
        setTitle("");
        setAuthor("");
        setPyear("");
    }

    const handleDelete = async(id)=>{
        await axios.delete(base_url+`/${id}`);
        fetchAll();
    }

    const [editId,setEditId]=useState("");

    const handleEditInit = (item)=>{
        setEditId(item.id);
        setAuthor(item.author);
        setTitle(item.title);
        setPyear(item.published_year);

    }

    const handleUpdate = async (e)=>{
        e.preventDefault();
        const data = {title, author, pyear};
        await axios.put(base_url+`/${editId}`,data);
        fetchAll();
        setTitle("");
        setAuthor("");
        setPyear("");
        setEditId(null);
        
    }

  return (
    <div className='conatiner'>
        <div className='form'>
            <h2>{editId ? "Update Book" : "Add Book"}</h2>
            <form onSubmit={editId ? handleUpdate : handleAdd}>
                <input type="text" name={title} placeholder='Title' value={title} required onChange={(e)=>setTitle(e.target.value)}/>
                <input type="text" name={author} placeholder='Author' value={author} required onChange={(e)=>setAuthor(e.target.value)}/>
                <input type="number" name={pyear} placeholder='Published Year' value={pyear} required onChange={(e)=>setPyear(e.target.value)}/>
                <button type='submit'>{editId ? "Update" : "Add"}</button>
            </form>
        </div>
        <div className='table-div'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published Year</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Data.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.published_year}</td>
                                <td><button onClick={()=>handleDelete(item.id)}>Delete</button></td>
                                <td><button onClick={()=>handleEditInit(item)}>Update</button></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    </div>
  )
}
