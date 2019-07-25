import React from 'react';



const User = props => {
    return (   
        <div className="user-wrapper">
             <h2>{props.user.name}</h2>
            <h3>{props.user.bio}</h3>
            <button onClick={()=>{props.deleteUser(props.user.id)}}>Delete User</button>
        </div>
        
    )
}

export default User;