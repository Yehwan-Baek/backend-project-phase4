// components/organisms/LoginPage.js
import React from 'react';
import LogInForm from '../Molecules/LogInForm';

function LogInPage({ handleLogin }) {

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Log In</h1>
            <LogInForm handleLogin={handleLogin}/>
        </div>
    );
}

export default LogInPage;
