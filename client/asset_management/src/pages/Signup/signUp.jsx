import React, { Fragment, useState, useEffect } from "react";
import picup from "../../images/picup.png";
import { useNavigate } from "react-router-dom";
import PassWord from "../../components/input/password";
import RepeatPassWord from "../../components/input/repeatpass";
import EmailInput from "../../components/input/email";
import { useDebounce } from "../../hooks/useDebounce"; // Path to your hook

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(""); // For real-time email feedback
    const [passWord, setPassWord] = useState("");
    const [error, setError] = useState(false);

    // 1. Initialize the debounce hook
    const debouncedEmail = useDebounce(email, 500);

    // 2. The side-effect that runs when the debounced value changes
    useEffect(() => {
        const validateEmail = async () => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!debouncedEmail) {
                setStatus("");
                return;
            }

            if (!regex.test(debouncedEmail)) {
                setStatus("Invalid Email Format");
                return;
            }

            setStatus("Checking availability...");

            try {
                const response = await fetch("http://localhost:8000/api/check-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: debouncedEmail }),
                });

                const data = await response.json();

                if (response.status === 200) {
                    setStatus("✅ Email is available!");
                } else if (response.status === 409) {
                    setStatus("❌ Email already taken.");
                } else {
                    setStatus("⚠️ " + data.message);
                }
            } catch (err) {
                setStatus("Server Error (Is backend running?)");
            }
        };

        validateEmail();
    }, [debouncedEmail]);

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        // 1. Double check: Don't even try if the email is already marked as taken
        if (status !== "✅ Email is available!") {
            alert("Please use a unique and valid email.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: passWord
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert("Signup Successful!");
                navigate("/SignIn"); // Redirect to Login page
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            alert("Connection failed. Is the server running?");
        }
    };

    return (
        <Fragment>
            <div className="grid grid-cols-1 lg:grid-cols-[1000px_1fr] min-h-screen">
                <div className="relative min-h-screen">
                    <div className="z-10 absolute top-[50px] left-[80px] w-[500px] p-5">
                        <p className="text-3xl w-[550px] leading-13">
                            The only way <span className="text-blue-500">to do great work</span> is to <span className="text-blue-500">love what you do</span>
                        </p>
                        <p className="ml-60 text-xl font-semibold">- Steve Jobs </p>
                    </div>
                    <img src={picup} className="w-full h-full z-10" alt="img" />
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <form onSubmit={(e) => { handleSignUp(e) }}>
                            <div className="flex flex-col gap-3 h-[540px] w-[500px] p-10">
                                <h2 className="text-3xl font-semibold mb-5">Sign Up</h2>

                                {/* 3. Displaying the status below the EmailInput */}
                                <div className="flex flex-col gap-1">
                                    <EmailInput
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className={`text-[12px] font-medium ml-1 ${status.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                                        {status}
                                    </span>
                                </div>

                                <PassWord value={passWord} onChange={(e) => setPassWord(e.target.value)} />
                                <RepeatPassWord />

                                <button
                                    className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl text-center"
                                    disabled={status !== "✅ Email is available!"}
                                >
                                    SignUp
                                </button>

                                <div className="flex gap-4 items-center">
                                    <div className="h-px bg-gray-400 flex-1"></div>
                                    <span>or</span>
                                    <div className="h-px bg-gray-400 flex-1"></div>
                                </div>

                                <div className="flex justify-between">
                                    <button type="button" className="border h-[50px] w-[200px] font-medium rounded-md border-gray-400 cursor-pointer text-[18px] hover:shadow-xl hover:scale-95 mx-auto">
                                        <img src="/google.svg" alt="google-logo" className="w-7 inline mr-2" />
                                        Google
                                    </button>
                                </div>

                                <p className="text-gray-400 mt-5">
                                    Already have an account? <span className="text-blue-700 cursor-pointer underline" onClick={() => navigate("/SignIn")}>Log In</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUp;