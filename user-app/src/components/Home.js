import React from 'react';
import axios from 'axios';
import UsersList from './UsersList';
import Modal from 'react-awesome-modal';

class Home extends React.Component{
    state = {
        users: undefined,
        error: "",
        isModalVisible: false,
        username:"",
        userbio:""
    }

    componentDidMount(){
        this.getAllUsers()
    }

    getAllUsers =() => {
        axios.get('http://localhost:5000/api/users')
        .then(res => { this.setState({
            users: res.data,
            error:''
             })
        })
        .catch(err => {
            console.log("this is the error:",err.message)
            this.setState({
                error: `${err.message}`
            })
        })
    }

    deleteUser= async (id) =>  {
        await axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(res =>{
            alert(`the user with ${id} was deleted`)
        })
        .catch(err => {
            alert(err.message)
        })

         this.getAllUsers()
    }

    toggleModal = () => {
     
            this.setState({
                isModalVisible: !this.state.isModalVisible
            })
        }


    saveUser = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.username,
            bio: this.state.userbio
        }

        if(newUser.name === "" || newUser.bio === ""){
                alert("Please enter a user name and user bio")
             }else{
                axios.post('http://localhost:5000/api/users',newUser)
                 .then(res => {
                    this.toggleModal()
                    this.getAllUsers()
                 })
                 .catch(err => {
                     this.toggleModal()
                     alert(err)
                 })

                 this.setState({
                     username: "",
                     userbio: ""
                 })
             }
    }

        onChangeHandler = (e) => {
                this.setState({
                   [ e.target.name ]: e.target.value
                })
        }
    

render(){
      
            if(this.state.users === undefined){
                    return <h2>{this.state.error}</h2>          
            } else {
                return(
                    <>
                        <h1>All Users Home page</h1>
                        <button onClick={this.toggleModal}>Add A User</button>
                        <UsersList users={this.state.users} deleteUser={this.deleteUser}/>

                        <Modal 
                        visible={this.state.isModalVisible}
                        width="400"
                        height="300"
                        effect="fadeInUp"
                        onClickAway={() => this.toggleModal()}
                             >
                        <div>
                            <h1>Add The User</h1>
                            <p>Please provide a name and short bio</p>
                            <form onSubmit={(e)=>{this.saveUser(e)}}>
                            <input type="text" name="username" value={this.state.username} onChange={this.onChangeHandler} placeholder="Enter User Name..." />
                            <input type="text" name="userbio" value={this.state.userbio} onChange={this.onChangeHandler} placeholder="Enter User Bio..."  />
                            <button type="submit" >Save</button>
                            </form>
                    }
                        </div>
                    </Modal>

                    </>
                )
            }
    }
}

export default Home;