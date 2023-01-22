import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useParams } from 'react-router-dom';



const View = (props) => {

    const [userdata , setdata] = useState([]);
    console.log(userdata)

    const {id} = useParams("");
    console.log(id);

    const hitfunction =async ()=>{

      
    const hit = await fetch(`/userdata/${id}`,{
        method : "GET",
        headers: {
            "content-type": "applicaton/json"
        }
    });

    const data = await hit.json();
    if(data.status===422 || !data){
        console.log("err");
       
    }else{
        setdata(data);
        console.log("get data");
       
    }
}   


 useEffect(()=>{
    hitfunction();
 },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div>
            <div className='container mt-5 card' style = {{width: "70%"}}>
                <div className='image_btn_handle justify-content-between d-flex'>
                    <img src='https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png' alt='img' className='img-fluid' width="50" />
                   
                </div>
                <div className='row mt-5'>
                    <div className='col-md-6 col-lg-6 col-12'>
                        <h3>Name: <span>{userdata.name}</span></h3>
                        <h5>Email: <span>{userdata.email}</span></h5>
                        <h5>Age: <span>{userdata.age}</span></h5>

                        <h5>description: <span>{userdata.desc}</span></h5>
                    </div>
                    <div className='col-md-6 col-lg-6 col-12 mt-4'>
                        <h5>work: <span>{userdata.work}</span></h5>
                        <h5>Mobile: <span>{userdata.mobile}</span></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View
