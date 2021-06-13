import React from 'react';
import './MyStyle.css';

function UserItem(props) {
    const {name, email, isGoldClient, salary, image, id, deleteUser} = props;

    return (
        <div class="userItem">
            <h3>User Name: { name }</h3>
            <p>Email: { email }</p>
            { salary
                ? <p>Salary: { salary } USD</p>
                : <p>Confidential salary.</p>
            }          
            { isGoldClient
                ? <h3>GOLD Client</h3>
                : null
            }
            <button onClick={() => deleteUser(id)}>Delete User</button>
            { image
                ? <img id="profilePhoto" src={ image } alt={name}/>
                : <p>No photo available.</p>
            }  
 
        </div>
    );
}

export default UserItem;