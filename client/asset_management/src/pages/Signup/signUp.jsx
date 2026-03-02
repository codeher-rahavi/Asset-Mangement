import React, { Fragment,useState} from "react";
import picup from "../../images/picup.png";
import { useNavigate } from "react-router-dom";
import PassWord from "../../components/input/password";
import RepeatPassWord from "../../components/input/repeatpass";
import EmailInput from "../../components/input/email";



const SignUp = () => {
    const navigate = useNavigate();
    const [email,setEmail] =useState("");
    const [passWord,setPassWord] = useState("");
    const [error,setError] = useState(false);
    return (
        <Fragment>
            <div className="grid grid-cols-1 lg:grid-cols-[1000px_1fr] min-h-screen">

                <div className="relative min-h-screen">
                    <div className="z-10 absolute top-[50px] left-[80px] w-[500px] p-5">
                        <p className="text-3xl w-[550px] leading-13">The only way <span className="text-blue-500">to do great work</span> is to <span className="text-blue-500">love what you do</span> </p>
                        <p className="ml-60 text-xl font-semibold">- Steve Jobs </p>
                    </div>
                    <img src={picup} className="w-full h-full z-10" alt="img" />
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" >
                        <form>
                            <div className="flex flex-col gap-3  h-[540px] w-[500px] gap-5 p-10">
                                <h2 className="text-3xl font-semibold mb-5">Sign Up</h2>
                                
                                <EmailInput
                                value={email}
                                onChange = {(e) =>
                                 setEmail(e.target.value)}/>
                                <PassWord/>
                                <RepeatPassWord/>

                                <a className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl text-center" href="#">
                                    SignUp
                                </a>

                                <div className="flex gap-4 items-center">
                                    <div className="h-px bg-gray-400 flex-1"></div>
                                    <span>or</span>
                                    <div className="h-px bg-gray-400 flex-1"></div>
                                </div>
                                <div className="flex  justify-between">

                                    <button type="submit" className="border h-[50px] w-[200px] font-medium  rounded-md border-gray-400 cursor-pointer text-[18px] hover:shadow-xl hover:scale-95 ml-[110px]">
                                        <img src="/google.svg" alt="google-logo" className="w-7 inline mr-2" />
                                        Google
                                    </button>
                                    
                                </div>
                                <p className="text-gray-400 mt-5">Already have an account ? <span className="text-blue-700 cursor-pointer underline" onClick={() => navigate("/SignIn")}>Log In</span></p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}
export default SignUp;