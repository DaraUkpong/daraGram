import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineDownload } from "react-icons/hi";
import {AiTwotoneDelete} from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin }) => {
    const  { postedBy, _id, image, destination, save } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.azp))?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.azp,
            postedBy: {
              _type: "postedBy",
              _ref: user.azp,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    client
    .delete(id)
    .then(() => {
      window.location.reload();
     
    })
  }

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => {setPostHovered(true); }}
        onMouseLeave={() => {setPostHovered(false);}}
        onClick={() => { navigate(`/pin-detail/${_id}`)}}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={(urlFor(image).width(500).url())}
          alt="user-post"
          className="rounded-lg w-full"
        />
 {postHovered && (
        <div
          className="absolute top-0 w-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
          style={{ height: "100%" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <a
                href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 p-2 rounded-lg justify-center text-dark text-xl opacity-75 hover:shadow-md outline-none hover:opacity-100 dark:text-black"
              >
                <HiOutlineDownload />
              </a>
            </div>
            {alreadySaved ? (
              <button
             type="button" className="bg-gray-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
            
            >
             {save?.length}  {(save?.length) === 1 ? 'Saved' : 'Saves'}
              </button>
            ) : (
              <button
              type="button"
              onClick={
                ((e) => {
                  e.stopPropagation();
                  savePin(_id);
                })
              }
                  className="bg-gray-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                    {savingPost ? 'Saving...' : 'Save'}
              
              </button>
            )}
          </div>
          <div className="flex justify-between items-center gap-2 w-full" >
              {destination && (
                <a href={destination} target="_blank" rel=" noreferrer" className="flex bg-white items-center gap-1 text-black  p-1 font-bold text-sm  pl-2 pr-2 rounded-full opacity-80 hover:100 hover:shadow-md">
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20 ? destination.slice(8, 18) : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === user.azp && (
            <button
            onClick={
              ((e) => {
                e.stopPropagation();
                deletePin(_id);
              })
            }
                className="bg-red-700 flex items-center justify-center p-2 w-8 h-8 opacity-70 hover:opacity-100 text-white font-bold text-base rounded-full hover:shadow-md outline-none"
            >
              <AiTwotoneDelete />
            </button>

          )} 
          </div>
         
        </div>
      )}
         </div>
     <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
      <img src={postedBy?.image} className="w-8 h-8 rounded-full object-cover" />
      <p className="text-sm ">{postedBy?.userName}</p>
     </Link>
     
    </div>
    
  );
};

export default Pin;
