import React from "react";
import SideBar from "../../components/sidebar/sidebar";
import grp1 from "../../images/grp1.jpg"
import grp2 from "../../images/grp2.jpg"
import { useState, useEffect } from "react";


const Admin = () => {
  const [lockedUsers, setLockedUsers] = useState([]);

  // 1. Fetch the list of hackers/locked accounts
  const fetchLocked = async () => {
    const res = await fetch("http://localhost:8000/api/admin/locked-users", {
      credentials: "include",
    });
    const result = await res.json();
    if (result.status === "success") setLockedUsers(result.data);
  };

  useEffect(() => { fetchLocked(); }, []);

  // 2. The Unblock Action
  const handleUnblock = async (email) => {
    const res = await fetch("http://localhost:8000/api/admin/unblock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: email }),
      credentials: "include",
    });

    if (res.ok) {
      alert(`User ${email} unblocked!`);
      fetchLocked(); // Refresh the list
    } else {
      alert("Failed to unblock. Are you an Admin?");
    }
  };

const loadSecurityData = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/admin/locked-users", {
      credentials: "include", // Essential for the 'protect' middleware to work
    });
    const result = await res.json();
    if (result.status === "success") {
      setLockedUsers(result.data);
    }
  } catch (err) {
    console.error("Security fetch failed", err);
  }
};

  return (
    <>
      <div className="grid lg:grid-cols-[260px_1fr] min-h-screen">
        <div className="p-10">
          <SideBar />
        </div>
        <div>
          <div className="p-10 sm:h-[50px] flex items-center justify-between ">
            <p className="text-2xl font-semibold">DashBoard</p>
            <input type="text" placeholder="Serach..." className="bg-gray-200 p-2 rounded-sm focus:outline-0 lg:w-[500px] sm:w-[100px]" />
            <div className="w-[50px] h-[50px] bg-gray-100 rounded-full flex items-center justify-center font-semibold">MH</div>
          </div>

          <div className="flex flex-col gap-4  p-4 md:p-6 lg:p-10 bg-gray-100">
            <div className="grid lg:grid-cols-[700px_1fr] gap-5 sm:grid-cols-1">

              <div className="bg-white h-[240px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">locked Accounts
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Institutional Security: Locked Accounts</h2>
                  {lockedUsers.length === 0 ? (
                    <p>No accounts currently locked.</p>
                  ) : (
                    <table className="w-full border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border">Email</th>
                          <th className="p-2 border">Reason</th>
                          <th className="p-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lockedUsers.map((user) => (
                          <tr key={user.email} className="text-center">
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border text-red-500">{user.lockReason}</td>
                            <td className="p-2 border">
                              <button
                                onClick={() => handleUnblock(user.email)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                              >
                                Authorize Unblock
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="bg-white h-[240px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">Damaged Assets
                <img src={grp2} alt="" />
              </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 md:grid-cols-2 ">
              <div className="bg-white h-[250px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">Total Cost</div>
              <div className="bg-white h-[250px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">customer satisfiaction</div>
              <div className="bg-white h-[250px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">target vs reality</div>
              <div className="bg-white h-[250px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">top products</div>
              <div className="bg-white h-[250px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">sales mapped by Stores</div>
              <div className="bg-white h-[250px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">Monthly Cost</div>

            </div>
          </div>
        </div>
      </div>



    </>


  );
};

export default Admin;