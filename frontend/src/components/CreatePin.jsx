import React, {useState} from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import {MdDelete} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

import {client} from '../client';
import Spinner from './Spinner';
import {categories} from '../utils/data';

const CreatePin = ({user}) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState(null);
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [wrongImageType, setWrongImageType] = useState(false);
    const navigate = useNavigate();

    const uploadImage = (e) => {
      const selectedFile = e.target.files[0]

      // Uploading Image to Sanity Datasets

      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
        setWrongImageType(false);
        setLoading(true);
        client.assets
          .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name})
          .then((document) => {
            setImageAsset(document);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Upload failed:', error.message);
          });
      } else {
        setLoading(false);
        setWrongImageType(true);
      }
     };

     const savePin = () => {
      if (title && about && destination && imageAsset?._id && category) {
        const doc = {
          _type: 'pin',
          title,
          about,
          destination,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset?._id
            }
           
          },
          userId: user._id,
          postedBy: {
            _type:'postedBy',
            _ref: user._id,
        },
        category,
        };
        client.create(doc)
        .then(() => {
          navigate('/');
        });
      } else {
        setFields(true);

        setTimeout(
          () => {
            setFields(false);
          },
          2000,

        );
      }
     }

    return ( 
        <div className="flex flex-col justify-center items-center mt-2  lg:h-4/5">
            {fields && (
                <p className='text-red-500 mb-5 text-sl transition-all duration-1000 ease-in-out'>All fields are required!</p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 rounded-md lg:w-4/5  w-full">
              <div className='bg-transparent p-1 flex flex-0.7 w-full'>
                <div className='flex justify-center items-center flex-col p-2 w-full h-410'>
                {loading && (
              <Spinner message={"Uploading..."}/>
            )}
            {
              wrongImageType && (
                <p>It&apos;s wrong file type.</p>
              )
            } {!imageAsset ? (
                <div className='flex justify-center items-center w-full pr-4 pl-4'>
                <label htmlFor="dropzone-file" className='flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer'>
                <div className='flex flex-col justify-center items-center pt-5 pb-6'>
                    <AiOutlineCloudUpload className='mb-3 w-10 h-10 text-gray-400'/>
                    <p className='mb-2 text-sm text-gray-500'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                    <p className='text-xs text-gray-500'>SVG,PNG,GIF,JPG</p>
                </div>
                <input type="file" id='dropzone-file' className='hidden' onChange={uploadImage}/>
                </label>

            </div>
            ) : (
                <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md hover:bg-red-500 transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}  
                </div>
              </div>
              <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
              <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title Here"
              type="text"
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
              />
              {user && (
                <div className='flex gap-2 mt-1 mb-1 items-center bg-white rounded-lg'>
                  <img src={user.image} alt="user" className="w-10 h-10 rounded-full"/>
                  <p className='font-thin'> {user.userName}</p>
                </div>
              )}
              <input 
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="What is your post about abeg?"
              type="text"
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
              />
              <input 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Add a destination link?"
              type="text"
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
              />
              <div className="flex flex-col">
                <div className="">
                   <p className="mb-2 font-semibold text-md sm:text-sm">Choose Post category...Sharp!</p>
                   <select onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                      <option value="other" className="bg-white">Select Category</option>

                      {categories.map((category) => (
                        <option className="text-sm border-0 outline-none capitalize bg-white text-white text-black" value={category.name} key={category.name}>{category.name}</option>
                      ))}
                   </select>
                </div>
                <div className="flex justify-end items-end mt-5">
                        <button tpe="button" className="bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none" onClick={savePin}>
                        Save Pin
                        </button>
                </div>
              </div>
              </div>
            </div>
        </div>
     );
}
 
export default CreatePin;