import React, {useState} from 'react';
import InputField from '../Atoms/InputField';
import Button from '../Atoms/Button';

function SignUpForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    function handleSubmit() {

    }

    return (
        <form onSubmit = {handleSubmit}>
            <InputField
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <InputField
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit" label="Create Account"/>
        </form>
    );
}

export default SignUpForm ;