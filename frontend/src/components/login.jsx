
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import daragram from '../assets/daragram.mp4'
import logo from '../assets/logo.png'
import { client } from '../client';


const Login = () => {
    const navigate = useNavigate();

    const onSuccess = (credentialResponse) => {
        const decoded = jwt_decode(credentialResponse.credential);
 localStorage.setItem('user', JSON.stringify(decoded));
     const {name, azp, picture} = decoded;
    
    const doc = {
        _id: azp,
        _type: 'user',
        userName: name,
        image: picture,
    }
    
    client.createIfNotExists(doc)
    .then(() => {
        navigate('/', {replace: true} )
    })

    }

    const onError = () => {
        console.log('it failed amn')
    }
   



    return ( 
       
<GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}>
 <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                {/* Add login screen background video or image */}
                <video 
                src={daragram}
                type="video/mp4"
                loop
                controls={false}
                muted
                autoPlay
                className='object-cover w-full h-full'
                />
                <div className='absolute flex flex-col justify-around items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        {/* add logo for app */}
                        <img src={logo} alt="logo" />
                    </div>
                    <div className='shadow-2xl' id='signInDiv'>
                       <GoogleLogin 
                       onSuccess={onSuccess}
                       onError={onError}
                       />
                    </div>
                </div>
            </div>
        </div>
</GoogleOAuthProvider> 
     );
}
 
export default Login;