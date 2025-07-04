import './account.css'
import { useEffect, useState } from 'react';
import user_stock from '../../assets/user.png'
import UfcButton from '../small-components/ufcbutton';
import { useNavigate } from 'react-router-dom';

export default function Account_info({ LoggedIn, setLoggedIn }) {
    let call = false;
    console.log(LoggedIn);
    const [Info, setInfo] = useState({});
    const navigate = useNavigate();
    
    let alerted = false;
    useEffect(() => {
    if(LoggedIn === 0 && !alerted) {
        alerted = true;
        alert("Not Logged In!");
        navigate("/");
    }
    });

    const get_account_info = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/account/${LoggedIn}`, {
            method: 'GET',
            });
            var result = await response.json();
            setInfo(result);
        }
        catch {
            alert("Backend Server is down!");
            return;
        }
    }

    useEffect(() => {
        get_account_info();
    }, [call]);

    const navigate_user = async() => {
        navigate("/change_username")
    }
    const navigate_pass = async() => {
        navigate("/change_password")
    }
    const delete_acc = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/account/delete/${LoggedIn}`, {
            method: 'DELETE',
            });
            if(response.status === 200) {
                alert("Account Deleted!");
                setLoggedIn(0);
                navigate("/");
            }
            else {
                alert("Something went wrong");
            }
        }
        catch {
            alert("Backend Server is down!");
            return;
        }
    }

    return(
        <div className="account-info-page">
            <div className="account-info">
                <div className='image-info'>
                <img src={user_stock} alt="My Logo" height={200} />
                    <div className="info">
                        <p>Account ID: {Info.AccountID}</p>
                        <p>Username: {Info.Username}</p>
                        <p>Password: {Info.Password}</p>
                    </div>
                </div>
                <div className="account-info-buttons">
                    <UfcButton click={navigate_user}>Change Username</UfcButton>
                    <UfcButton click={navigate_pass}>Change Password</UfcButton>
                    <UfcButton click={delete_acc}>Delete Account</UfcButton>
                </div>
            </div>
        </div>
    );
}