import React, {useState}from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
  const [credentials,setcredentials]=useState({email:"",password:""})
   let navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
    const response= await fetch("https://foodie-backend-g7ww.onrender.com/api/loginuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const json=await response.json()
    console.log(json);
    if(!json.success){
        alert('Enter valid Credentials');
    }
    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate('/');
  }
   }
   const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
   }
  return (
    <div>
    <div className='container my-5' style={{height: "500px", width: "600px", background: "black", color: "white", outline: "thick solid green"}}>
      <h1>Login Form</h1>
       <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
 <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user</Link>
</form>
</div>


    </div>
  )
}

export default Login
