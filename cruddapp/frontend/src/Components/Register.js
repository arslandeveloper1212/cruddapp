import React, { useState } from 'react'


function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",
  });




  const HandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setState({ ...state, [name]: value });

  }

  const SaveDetail = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, address, desc } = state;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name, email, age, mobile, work, address, desc
      })
    });

    const data = await res.json();
    if(data.status === 422 || !data){
      alert("not registered");
      console.log("not registration ");
    }else {
      alert ("registration successfully");
      console.log("registered successfuly");
      
    }
  }


  return (
    <div className='d-flex justify-content-center align-items-center'>

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <form onSubmit={SaveDetail} method= "POST" >
              <div className='form-group mt-3'>
                <label>Name</label>
                <input type="text" name="name" value={state.name} onChange={HandleInput} className="form-control" />
              </div>

              <div className='form-group mt-3'>
                <label>Email</label>
                <input type="email" name="email" value={state.email} onChange={HandleInput} className="form-control" />
              </div>

              <div className='form-group mt-3'>
                <label>Age</label>
                <input type="text" name="age" value={state.age} onChange={HandleInput} className="form-control" />
              </div>

              <div className='form-group mt-3'>
                <label>Mobile</label>
                <input type="text" name="mobile" value={state.mobile} onChange={HandleInput} className="form-control" />
              </div>

              <div className='form-group mt-3'>
                <label>Work</label>
                <input type="text" name="work" value={state.work} onChange={HandleInput} className="form-control" />
              </div>

              <div className='form-group mt-3'>
                <label>Address</label>
                <input type="text" name="address" value={state.address} onChange={HandleInput} className="form-control" />
              </div>

              <div className='form-group mt-3'>
                <label>Description</label>
                <textarea type="desc" name='desc' value={state.desc} onChange={HandleInput} className='form-control' cols='10'></textarea>
              </div>

              <div className='form-group mt-3'>
                <button type='submit' className='btn btn-primary'>Submit</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register