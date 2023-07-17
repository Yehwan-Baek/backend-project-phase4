import React, {useState} from 'react';
import InputField from '../Atoms/InputField';
import Button from '../Atoms/Button';

function LogInForm() {
    
    
    function handleSubmit() {

    }

    return (
        <form onSubmit = {handleSubmit}>
            <InputField/>
            <InputField/>
            <Button/>
        </form>
    );
}

export default LogInForm ;