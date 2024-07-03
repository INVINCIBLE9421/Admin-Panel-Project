import '../../App.css';
import React,{useEffect, useRef,useState} from "react";
import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTrashAlt);

const Role = (props) => {

    const navigate=useNavigate();

    const data = props.data;
    const {name,email,password,phone,profilePic}=data || "";

    const [picState, setPicState] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [match, setMatch] = useState(false);
    const [image, setImage] = useState("");
    const [formData, setFormData] = useState({
        profilePic:"",
        name:"",
        email:"",
        password:"",
        phone:""
    });

    useEffect(()=>{
        if(data){
            setPicState(data.profilePic);
            setFormData({
                profilePic:data.profilePic,
                name:data.name,
                email:data.email,
                password:data.password,
                phone:data.phone
            })
        }
    },[data]);

    const fileInputRef=useRef(null);

    function handleFileUpload() {
        fileInputRef.current.click();
    }

    function handleFileChange(e) {
        const file=e.target.files[0]

        if(file){
            const allowedTypes=['images/jpeg','images/png','images/bmp','images/svg+xml','images/webp'];
            if(!allowedTypes.includes(file.type)){
                alert('Only JPG, PNG, BMP, SVG, and WEBP files are allowed.');
                return;
            }
            const maxSize=1024*1024;
            if(file.size>maxSize){
                alert('File size cannot exceed 1MB.');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () =>{
                setImage(reader.result)
                setPicState(reader.result)
                setFormData({...formData,profilePic:reader.result})
            }
        }else{
            setImage("");
        }
    }

    function handleRePassword(e){
        setRePassword(e.target.value)    
    }
    function handleIconClick(){
        setPicState("")
        setImage("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(match){
            alert("Password does not match");
            return;
        }

        if(!image && !picState){
            alert("Please upload an image");
            return;
        }

        props.handlestoreData(formData);

        setImage("");
    }

    useEffect (()=>{
        formData.password === rePassword ? setMatch(false) : setMatch(true);
    },[rePassword])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className='row phdiv'>
                    <div className='photodiv'>
                        <h2>Change Avatar</h2>
                        <div className='photocon' style={{backgroundColor : image === "" ? "#aaa" : "transparent" , border : "1px solid black" , width : "250px"}}>
                            <div className='deleteicondiv'>
                                <FontAwesomeIcon icon="far fa-trash-alt" className='deleteicon' size='lg' style={{color:'#ffffff'}} onClick={handleIconClick}/>
                            </div>
                            {!image && <img src={picState} alt=' ' style={{width:'250px'}}/>}
                            {image && <img src={image} alt=' ' style={{width:'250px'}}/>}
                        </div>
                        <div >
                            <input type='file' name='profilepic' ref={fileInputRef} style={{display:'none'}} onChange={handleFileChange}/>
                            <input type='button' onClick={handleFileUpload} className='button' value="UPLOAD NEW PHOTO"/>
                        </div>
                    </div>
                    <div className='details'>
                        <div className='detail'>
                            <h2>Account Settings</h2><br/>
                            <div className='detail1'>
                                <div>
                                    <label>Account Name</label><br/>
                                    <input type='text'name='name' value={formData.name} className='account-input' onChange={(e) => setFormData({...formData,email:e.target.value})} required/>
                                </div>
                                <div>
                                    <label>Account Email</label><br/>
                                    <input type='email'name='email' value={formData.email} className='account-input' onChange={(e) => setFormData({...formData,email:e.target.value})} required/>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='password' name='password' value={formData.password} className='account-input' onChange={(e) => {setFormData({...formData,password:e.target.value}); setMatch(true)}} required/>
                                </div>
                                <div>
                                    <label>Re-Enter Password</label>
                                    <input type='password' name='password' value={rePassword} className='account-input' onChange={handleRePassword} required={match}/>
                                    {match && <p>Password does not match</p>}
                                </div>
                                <div>
                                    <label>Phone</label>
                                    <input type='text' name='phone' maxLength='10' pattern='[0-9]{10)' value={formData.phone} className='account-input' onChange={(e) => setFormData({...formData,phone:e.target.value})} title='Please enter 10 digit phone number' required/>
                                </div>
                                <div style={{marginTop:'30px'}}>
                                    <input type='submit' className='button' value='UPDATE YOUR PROFILE'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Role;