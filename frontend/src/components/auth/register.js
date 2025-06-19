import Login from '@react-login-page/base';
import { Username, Password, Submit, Title, Logo} from '@react-login-page/base';
import UFC_logo from '../../assets/UFC_Logo.png'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const click = async(username, password, password_conf, navigate) => {
        // Build the x-www-form-urlencoded body
    const formBody = new URLSearchParams({
        username: username.current.value,
        password: password.current.value,
        confirmpassword: password_conf.current.value,
    }).toString(); // "username=alice&password=secret"

    try {
        const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: formBody
        });
        console.log(response);
        if(response.status === 200) {
            alert("Registeration Successful!");
            navigate("/");
        }
    }

    catch {
        alert("Backend Server is Down!");
        return;
    }
}

export default function Register_page() {
    const username = useRef(null);
    const password = useRef(null);
    const password_conf = useRef(null);
    const navigate = useNavigate();
    
    return(
        <div className='login-page'>
            <Login>
                <Title>Register</Title>
                <Username ref={username}></Username>
                <Password ref={password}></Password>
                <Password keyname="confirm" ref={password_conf} placeholder='Confirm Password'></Password>
                <Logo>
                    <img src={UFC_logo} alt="My Logo" height={20} />
                </Logo>
                <Submit onClick={() => click(username, password, password_conf, navigate)}></Submit>
            </Login>
        </div>
    );
}