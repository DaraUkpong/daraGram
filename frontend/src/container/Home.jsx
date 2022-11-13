import React, { useState, useEffect, useRef } from "react";
import logo from '../assets/logo.png'
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile} from "../components";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { client } from "../client";
import { fetchUser } from "../utils/fetchUser";
import {Flowbite, DarkThemeToggle} from 'flowbite-react'

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();
  useEffect(() => {
    const query = userQuery(userInfo?.azp);
    client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    });
  });

//  useEffect(() =>{
//   scrollRef.current.scrollTo(0, 0);
//  })

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
       
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center sticky bg-white/30 backdrop-blur-3xl bg-opacity-10 dark:bg-gray-900">
          <HiMenu
            fontSize={40}
            className="cursor-pointer dark:text-white"
            onClick={() => setToggleSideBar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
         
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="ProfileImg" className="w-14 rounded-full" />
          </Link>
          
          
        </div>
        {toggleSideBar && (
          <div className="fixed w-4/5 bg-gray-100 h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              
              <Flowbite>
                <DarkThemeToggle fontSize={30}/>
              </Flowbite>

<AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer ml-4 dark:text-white"
                onClick={() => setToggleSideBar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSideBar} />
          </div>
        )}
      </div>
      <div className="pb-2  flex-1 h-screen overflow-y-scroll dark:bg-gray-900" >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
