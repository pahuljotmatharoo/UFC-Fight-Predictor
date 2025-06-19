import Login from '@react-login-page/base';
import { useRef } from 'react';
import { Username, Password, Submit, Logo} from '@react-login-page/base';
import UFC_logo from '../../assets/UFC_Logo.png'
import { useNavigate } from 'react-router-dom';

export default function Login_page({setLoggedIn}) {
    const username = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const click = async() => {
          // Build the x-www-form-urlencoded body
        const formBody = new URLSearchParams({
            username: username.current.value,
            password: password.current.value,
        }).toString();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: formBody
            });
            
            var data = await response.json();
            console.log(response);
            if(response.status === 200) {
                alert("Logged in!");
                setLoggedIn(data.accountID);
                navigate("/predictor");
            }
            else if(response.status === 401) {
                alert("Incorrect Password!");
                return;
            }
            else if(response.status === 404) {
                alert("Account not found! Please register");
                return;
            }
        }

        catch {
            alert("Backend Server is Down!");
            return;
        }
    }

    return(
        <div className='login-page'>
            <Login>
                 <Username ref={username}></Username>
                 <Password ref={password}></Password>
                 <Submit onClick={click}></Submit>
                 <Logo>
                    <img src={UFC_logo} alt="My Logo" height={20} />
                 </Logo>
            </Login>
        </div>
    );
}