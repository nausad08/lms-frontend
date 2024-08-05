import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { createAccount } from "../Redux/Slices/AuthSlice";

const SignUp = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[previewImage, setPreviewImage] = useState("");
    const[signupData, setSignupData] = useState({
        fullName:"",
        email:"",
        password: "",
        avatar:""
    });
    function handleUserInput(e) {
        const{name,value} = e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }
    function getImage(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            setSignupData(
                {
                    ...setSignupData,
                    avatar:uploadedImage
                }
            )
            const fileReader =new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                // console.log(this.result);
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(event){
        event.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar){
            toast.error("please fill the all the details");
            return;
        }
        // checking name field  length
        if(!signupData.fullName.length <5 ){
            toast.error("Name should be atleast of 5 characters");
            return;
        }

        if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   )){
            toast.error("Invalid email id");
            return;
        }
        // checking password validation
        if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)){
            toast.error("Min 1 UpperCase min 1 lowercase min 1 special 1 number 8char ");
            return;
        }
        const formData  = new FormData();
        formData.append("fullname",signupData.fullName);
        formData.append("email",signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar",signupData.avatar);

        // dispatch account section
        const response = await dispatch(createAccount(formData))
        if(response?.payload?.success)   
          navigate("/");
        setSignupData({
            fullName:"",
            email:"",
            password: "",
            avatar:""
        })
        setPreviewImage("");

    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]" >
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {
                            previewImage?(
                                <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                            ) : (
                                <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                            )
                        }
                    </label>
                    <input
                    onChange={getImage}
                      className="hidden"
                      type="file"
                      name="image_uploads"
                      id="image_uploads"
                      accept=".jpg,.jpeg,.png,.svg"
                    />
                      <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Fullname</label>
                        <input 
                          type="text"
                          required
                          name="fullName"
                          id="fullName"
                          placeholder="Enter your fullname..."
                          className="bg-transparent px-2 py-1 border "
                          onChange={handleUserInput}
                          value={signupData.fullName}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input 
                          type="email"
                          required
                          name="email"
                          id="email"
                          placeholder="Enter your email..."
                          className="bg-transparent px-2 py-1 border "
                          onChange={handleUserInput}
                          value={signupData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                          type="password"
                          required
                          name="password"
                          id="password"
                          placeholder="Enter your password..."
                          className="bg-transparent px-2 py-1 border "
                          onChange={handleUserInput}
                          value={signupData.password}
                        />
                    </div>

                    <button type="submit" className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm p-2 font-semibold text-lg">
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to="/login" className="link text-accent cursor-pointer">login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default SignUp;