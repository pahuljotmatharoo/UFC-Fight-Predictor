import './account.css'
import { useEffect, useState } from 'react';
import user_stock from '../../assets/user.png'
import UfcButton from '../small-components/ufcbutton';

export default function Account_info(LoggedIn) {
    const [Info, setInfo] = useState({});
    var tries = 0;
    const get_account_info = async () => {
        const response = await fetch(`http://127.0.0.1:5000/account/${LoggedIn.LoggedIn}`, {
        method: 'GET',
        });
        var result = await response.json();
        setInfo(result);
    }
    useEffect(() => {
        get_account_info();
    }, [LoggedIn]);

    return(
        <div className="account-info-page">
        <div className='image-info'>
         <img src={user_stock} alt="My Logo" height={200} />
            <div className="info">
                <p>Account ID: {Info.AccountID}</p>
                <p>Username: {Info.Username}</p>
                <p>Password: {Info.Password}</p>
            </div>
            </div>
            <div className="account-info-buttons">
                <UfcButton>Change Username</UfcButton>
                <UfcButton>Change Password</UfcButton>
                <UfcButton>Delete Account</UfcButton>
                </div>
        </div>
    );
}