import React from "react";
import SideBar from "../../components/sidebar/sidebar";
import { faCircleUser, faBell, faCalendar, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bargraph from "../../images/bargraph.webp";



const UserProfile = () => {
    return (
        <>
            <div className="grid grid-cols-1  lg:grid-cols-[260px_1fr_300px] min-h-screen bg-gray-50 ">
                <div className="bg-white">
                    <SideBar />
                </div>

                <div>
                    <div className="search-bar p-2 bg-white 
                w-full md:w-[300px] lg:w-[500px] 
                mx-auto lg:ml-[50px] 
                mt-5 rounded-xl shadow-lg">
                        <input type="text" placeholder="Search.." className="w-[450px] focus:outline-0 p-1" />
                    </div>

                    <div className="flex mt-10 justify-around ">
                        <div className="flex flex-col gap-5 w-[300px] p-5">
                            <a class="inline-block bg-blue-500 rounded-xl p-3 text-white text-lg cursor-pointer transition hover:scale-110 hover:shadow-xl" href="#">Complaint Form</a>
                            <a class="inline-block bg-blue-500 rounded-xl p-3 text-white text-lg cursor-pointer transition hover:scale-110 hover:shadow-xl" href="#">Request Form</a>
                            <a class="inline-block bg-blue-500 rounded-xl p-3 text-white text-lg cursor-pointer transition hover:scale-110 hover:shadow-xl" href="#">Complaint Form Status</a>


                        </div>
                        <div className="graph p-4 bg-white w-[600px] h-[300px] rounded-xl shadow-lg">
                            <img src={bargraph} className="bg-white w-full h-full object-contain overflow-hidden" alt="graph" />
                        </div>
                    </div>
                    <div className="flex flex-cols-3 mt-10 ml-10 gap-3 ">
                        <a class="inline-block rounded-sm bg-blue-400 w-[300px] h-[200px] rounded-xl shadow-2xl transition hover:scale-110 hover:rotate-2" href="#"></a>
                        <a class="inline-block rounded-sm bg-white w-[300px] h-[200px] rounded-xl shadow-2xl transition hover:scale-110 hover:-rotate-2" href="#"></a>
                        <a class="inline-block rounded-sm bg-blue-400 w-[300px] h-[200px] rounded-xl shadow-2xl transition hover:scale-110 hover:rotate-2" href="#"></a>
                    </div>

                </div>

                <div className="bg-white flex flex-col items-center ">
                    <div className=" mt-10 w-[260px] h-[130px] flex flex-col items-center  gap-2  ">
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} className="text-[40px] text-gray-400" />
                        </div>
                        <p className="text-lg">7376241CS333</p>
                        <p className="text-xl text-blue-900">RAHAVI GANESHAN</p>
                    </div>
                    <div className="notification flex  gap-8 ">
                        <div className="border border-2 w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer"><FontAwesomeIcon icon={faBell} className="text-[30px] text-gray-400" /></div>
                        <div className="border  border-2 w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer"><FontAwesomeIcon icon={faCalendar} className="text-[30px] text-gray-400" /></div>
                        <div className="border border-2 w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer"><FontAwesomeIcon icon={faEdit} className="text-[30px] text-gray-400" /> </div>
                    </div>
                    <div className="current-border bg-blue-500 rounded-xl mt-10 w-[260px] h-[130px] shadow-xl p-3 text-white">
                        <p>Venue: CSE LAB 3 ,SF Second Floor</p>
                        <p>Lab: Chemistry Lab</p>
                    </div>
                    <div className="chatbot  mt-10 w-[260px] h-[240px] shadow-xl p-3 ">
                        Ask Your Doubts...
                        <div className="AI border w-[230px] h-[180px] mt-2">
                            <div className="chat1 p-3 bg-blue-400 w-[100px] rounded-2xl mt-3 ml-2"></div>
                            <div className="chat2  bg-gray-400 w-[100px] rounded-2xl p-3 mt-2 ml-30"></div>
                            <input className="typing p-2 bg-gray-200 w-[200px] rounded-xl mt-15 ml-4 text-sm " placeholder="type here..."/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserProfile;