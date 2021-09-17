import React from 'react'
import { GoogleLogin } from 'react-google-login'

require('dotenv').config()
const clientId = process.env.REACT_APP_CLIENTID

export default function Login({ handleLogin }) {

    const onSuccess = res => {
        const { profileObj } = res
        handleLogin(profileObj)
    }

    const onFailure = res => {
        console.log('[Login failed] res:', res)
    }

    return (
        <div className="mt-4 mb-2" >
            <GoogleLogin 
                clientId={ clientId }
                buttonText="Login with Google"
                onSuccess={ onSuccess }
                onFailure={ onFailure }
                cookiePolicy={'single_host_origin'}
                isSignedIn={true} />
        </div>
    )
}
