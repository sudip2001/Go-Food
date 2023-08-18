import React,{useState}from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Signup() {

  const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit=async(e)=>{
          e.preventDefault();
          const response =await fetch("http://localhost:5000/api/creatuser",{
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
          });

          const json=await response.json()
          console.log(json);

          if(json.success){
              alert("enter valid credentials")
          }
    }

    const onChange=(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value})
    }


    return (
      <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
        <div>
          <Navbar />
        </div>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: 'white' }}>Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} style={{ width: '50%' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'white' }}>Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" style={{ width: '50%' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: 'white' }}>Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" style={{ width: '50%' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="geolocation" className="form-label" style={{ color: 'white' }}>Address</label>
              <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="geolocation" style={{ width: '50%' }} />
            </div>
            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
          </form>
        </div>
      </div>
    )
    
    
}
