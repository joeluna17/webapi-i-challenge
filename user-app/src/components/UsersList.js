import React from 'react';
import User from './User';

const MembersList = (props) => {
    return(
        <div className="user-list-container">
        {
            props.users.map(user => {
            return  (  
                        <User user={user} key={user.id} deleteUser={props.deleteUser}/>
                     )
            })
        }
        </div>
    )
}

export default MembersList;
