import {Component} from 'react'
import UserLogin from './UserLogin';
import CreateUser from './CreateUser'

// const baseURL = 'http://localhost:3003'

class UserSection extends Component{
    constructor(props) {
        super(props)
        this.state = {
            loggedIn : false,
            showLogin : false,
            showCreateUser : false,
        }
    }


// *** FUNCTIONS ***
toggleLogin = () => {
    this.setState({
        showLogin: !this.state.showLogin
    })
}

toggleCreateUser = () => {
    this.setState({
        showCreateUser: !this.state.showCreateUser
    })
}

userLoggedIn = () => {
    this.setState({
        loggedIn: true
    })
}

    render() {
        return(
            <div>
                <button className="btn btn-primary mt-3" onClick={this.toggleLogin} >LOGIN</button>
                <button className="btn btn-primary mt-3" >LOG OUT</button> 
                <button className="btn btn-primary mt-3" onClick={this.toggleCreateUser} >CREATE USER</button> <br/>
                {
                    this.state.showLogin && <UserLogin loggedIn={this.userLoggedIn}/>
                }
                {
                    this.state.showCreateUser && <CreateUser />
                }
            </div>
        )
    }
}



export default UserSection