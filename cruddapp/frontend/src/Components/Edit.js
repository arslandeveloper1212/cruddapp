import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Edit() {

  const navigate = useNavigate("");

  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",
  });

  // const [editdata , setdata] = useState([]);
  // console.log(editdata)

  const { id } = useParams("");
  console.log(id)

  const promise2 = async () => {
    const res = await fetch(`/userdata/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await res.json();
    if (data.status === 422) {
      console.log("not registered");
    } else {
      setState(data);
    }
  }
useEffect(() => {
    promise2();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps







  const HandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setState({ ...state, [name]: value });

  }

  const SaveDetail = async (e) => {
    e.preventDefault();

    const { name, email, age, mobile, work, address, desc } = state;

    const res2 = await fetch(`/updatedata/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name, email, age, mobile, work, address, desc
      })
    });
    const data2 = await res2.json();
    if (data2.status === 422 || !data2) {
      console.log("not added");
      alert("fill the data")
    } else {
      alert("data added successfuly");
     
      navigate('/');

    }
  }





  return (
    <div className='d-flex justify-content-center align-items-center'>

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <form onSubmit={SaveDetail} >
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

export default Edit