import React, { useState } from "react";
import signin from "../../images/signin.jpg";
import { useNavigate } from "react-router-dom";
import PassWord from "../../components/input/password";
import EmailInput from "../../components/input/email";


const SignIn = () => {
    const navigate = useNavigate();

    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-[660px_1fr] min-h-screen">

            <div className="relative">
                <form onSubmit="">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 w-[400px]">
                        <h3 className="text-3xl mb-6 font-semibold">Log In</h3>
                        <EmailInput />
                        <PassWord />

                        <button
                            type="submit"
                            className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl text-center"
                        >
                            Log In
                        </button>
                        <p className="text-blue-700 flex justify-end">Forget password?</p>
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-gray-400 flex-1"></div>
                            <span>or</span>
                            <div className="h-px  bg-gray-400 flex-1"></div>
                        </div>

                        <div className="flex  justify-between mt-4 gap-3">
                            <button type="submit" className="border h-[50px] w-[200px] font-medium  rounded-md border-gray-400 cursor-pointer text-[18px] hover:shadow-xl hover:scale-95 ml-[100px]">
                                <img src="/google.svg" alt="google-logo" className="w-7 inline mr-2" />
                                Google
                            </button>

                        </div>
                        <p className="mt-4">Don't have an account ? <span className="text-blue-700 cursor-pointer underline" onClick={() => navigate("/SignUp")}>Sign Up</span></p>
                    </div>
                </form>
            </div>
            <div className="relative">
                <div className="absolute z-10  top-[100px]  text-2xl w-[610px] ml-24">
                    <p className="text-3xl leading-12">The Future belongs to those who <span className="text-blue-600">believe</span> in the <span className="text-blue-600">beauty of theirs of Dreams..</span> </p>
                    <p className="text-xl ml-98 mt-2 font-semibold"> -Eleanor Roosevelt</p>
                </div>
                <img src={signin} alt="signin" className="w-full h-screen object-cover" />
            </div>
        </div>
    )
}
export default SignIn;