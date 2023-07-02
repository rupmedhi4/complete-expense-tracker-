import React from 'react'
import { useNavigate } from 'react-router-dom';
import './UserDetails.css'
import { auth } from '../../Firebase';

export default function UserDetails() {

    const user = auth.currentUser;
    const navigate = useNavigate();

    const editProfileHandler = (e) => {
         e.preventDefault();
         navigate("/updateprofile")
        
    }

    return (
        <div className="user-welcome-page" >
            <div className="edit-profile-container">
                <button className="edit-profile-btn btn" onClick={editProfileHandler}>
                    Edit Profile
                </button>
            </div>
            <div className="user-header">
                <h1>Welcomes {user.displayName}</h1>
            </div>

            <ul className="collection with-header beautiful-collection " >
                <li className="collection-header"><h4>Profile Details</h4></li>
                <li className="collection-item center-ul">
                    <div className="item-content">Name : {user.displayName}</div>

                    {user.photoURL ? <div className="item-content">PhotoUrl : {user.photoURL}</div>
                        : ""}
                </li>

            </ul>

        </div>
    )
}
