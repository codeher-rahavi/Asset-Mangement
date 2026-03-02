import React from "react";
import SideBar from "../../components/sidebar/sidebar";
import grp1 from "../../images/grp1.jpg"
import grp2 from "../../images/grp2.jpg"


const Admin = () => {
    return (
        <>
            <div className="grid lg:grid-cols-[260px_1fr] min-h-screen">
                <div className="p-10">
                    <SideBar />
                </div>
                <div>
                    <div className="p-10 sm:h-[50px] flex items-center justify-between ">
                        <p className="text-2xl font-semibold">DashBoard</p>
                        <input type="text" placeholder="Serach..." className="bg-gray-200 p-2 rounded-sm focus:outline-0 lg:w-[500px] sm:w-[100px]"/>
                        <div className="w-[50px] h-[50px] bg-gray-100 rounded-full flex items-center justify-center font-semibold">MH</div>
                    </div>

                    <div className="flex flex-col gap-4  p-4 md:p-6 lg:p-10 bg-gray-100">
                        <div className="grid lg:grid-cols-[700px_1fr] gap-5 sm:grid-cols-1">
                            <div className="bg-white h-[240px] rounded-xl p-2 cursor-pointer hover:scale-105 transition-transform duration-300">Total assets
                                <img src={grp1} alt="logo" className="w-[500px] h-full object-contain" />
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