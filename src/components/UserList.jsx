import React from 'react';
import UserItem from './UserItem';
import './MyStyle.css';

function UserList(props) {
    const { users, deleteUser } = props;

    return (
        <div>
            <h2 class="listTitle">User List:</h2>
                <div className="userList">
                { users.map((user, index) => {
                    return <UserItem
                        id={ user.id }
                        name={ user.name }
                        email={ user.email }
                        salary={user.salary}
                        image={user.image}
                        isGoldClient={ user.isGoldClient }
                        key={ index }
                        deleteUser = { deleteUser }
                />
            })}
                </div>
        </div>
    );
}

export default UserList;