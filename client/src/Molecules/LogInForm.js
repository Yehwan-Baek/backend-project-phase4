import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import InputField from '../Atoms/InputField';
import Button from '../Atoms/Button';

function LogInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    function handleSubmit() {

    }

    return (
        <form onSubmit = {handleSubmit}>
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
            <Button type="submit" label="Log In"/>
            <p>
                No account? <Link to="/signup">CREATE ONE</Link>
            </p>
        </form>
    );
}

export default LogInForm ;