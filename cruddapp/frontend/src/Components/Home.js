import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Home = () => {
  
  const [userinterval, setinterval] = useState([]);
  console.log(userinterval);

  const getdata = async () => {
    const userdata1 = await fetch("/userdata", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }

    });
    const data = await userdata1.json();
    console.log(data);
    if (data.status === 422 || !data) {
     
      console.log("not added");
    } else {
      setinterval(data);
     
      console.log("added successfully");
    }
  }

  useEffect(() => {
    getdata();
  },[])

  //delete user function here

 const deleteuser =async(id) =>{
  const response = await fetch (`/deleteuser/${id}`,{
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  });
  const deletedata = await response.json()
  console.log(deletedata)
  if(deletedata.status === 422 || !deletedata){
    console.log(deletedata);
  }else{
    console.log("user deleted");
    getdata();
  }
 }



  return (
    <div>
      <div className="container">
        <div className=" text-end mt-5 mb-3">
          <Link to="/register"><button className="btn btn-primary">Add Student</button></Link>
        </div>
        <div className="row">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th >Id</th>
                <th >Name</th>
                <th >Email</th>
                <th >Work</th>
                <th >Address</th>
              </tr>
            </thead>
            <tbody>

              {
                userinterval.map((element, id) => {
                  return (
             
                      <tr key={id}>
                        <th>{id+1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.work}</td>
                        <td>{element.address}</td>
                        <td className="d-flex">
                        <Link to={`view/${element._id}`}><button className="btn btn-info"><VisibilityIcon/></button></Link>
                        <Link to={`/edit/${element._id}`}><button className="btn btn-success mx-3"><EditIcon/></button></Link>
                       <button onClick={()=>{deleteuser(element._id)}}  className="btn btn-danger"><DeleteIcon/></button>
                        </td>



                      </tr>
              
                  
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
