import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const ResetPasswordPage = () => {
  const { token } = useParams(); // Grabs token from URL: /reset-password/:token
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/resetPassword/${token}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        alert("Password updated and account unblocked!");
        navigate("/login");
      } else {
        alert("This link is expired or invalid.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reset-container">
      <input 
        type="password" 
        placeholder="New Password" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleUpdatePassword}>Set New Password</button>
    </div>
  );
};

export default ResetPasswordPage;