import Login from '@react-login-page/base';
import { useRef } from 'react';
import { Username, Password, Submit, Title, Logo} from '@react-login-page/base';
import UFC_logo from '../../assets/UFC_Logo.png'
import './account_details.css'
import { useNavigate } from 'react-router-dom';

export default function Change_password(LoggedIn) {
    let navigate = useNavigate();
    let username = useRef();
    let new_password = useRef();
    let password = useRef();

    const change_acc = async () => {
        const formBody = new URLSearchParams({
                    username: username.current.value,
                    new_password: new_password.current.value,
                    old_password: password.current.value
                }).toString();
        if(new_password.current.value.length < 5) {
            alert("New Username needs to be longer than 5 characters!");
            return;
        }
        const response = await fetch(`http://127.0.0.1:5000/account/change_password/${LoggedIn.LoggedIn}`, {
            method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                },
                body: formBody
        })
        if(response.status === 200) {
            alert("Password changed successfully!");
            navigate("/account_info");
        }
        else {
            alert("Your information is incorrect!");
        }
    }

    return(
    <div className='login-page'>
        <Login>
            <Title>Change Password</Title>
            <Username ref={username} placeholder='Username'></Username>
            <Password ref={password}></Password>
            <Password keyname="confirm" ref={new_password} placeholder='New Password'></Password>
            <Submit onClick={change_acc}></Submit>
            <Logo>
                <img src={UFC_logo} alt="My Logo" height={20} />
            </Logo>
        </Login>
    </div>
    );
}