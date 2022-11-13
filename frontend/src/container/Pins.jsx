import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PinDetail, CreatePin, Feed, Navbar, Search} from '../components'

const Pins = ({user}) => {
    const [searchTerm, setSearchTerm] = useState('');
    return ( 
        <div className='px-2 md:px-5 dark:bg-gray-900 dark:text-white'>
            <div className='bg-gray-50'>
                <Navbar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                user={user && user}
                />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/*' element={<Feed />}/>
                    <Route path='/category/:categoryId' element={<Feed />}/>
                    <Route path='/pin-detail/:pinId' element={<PinDetail user={user && user} />}/>
                    <Route path='/create-pin' element={<CreatePin user={user && user} />}/>
                    <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}/>
                </Routes>

            </div>
        </div>
     );
}
 
export default Pins;