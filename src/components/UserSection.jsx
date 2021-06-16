import {Component} from 'react'
import UserLogin from './UserLogin';
import CreateUser from './CreateUser'

// const baseURL = 'http://localhost:3003'

// let baseURL;

// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:3003';
// } else {
//   baseURL = 'https://cryptolog-api.herokuapp.com';
// }

class UserSection extends Component{
    constructor(props) {
        super(props)
        this.state = {
            loggedIn : false,
            showLogin : false,
            showCreateUser : false,
        }
        this.userLoggedIn = this.userLoggedIn.bind(this)
        this.userLoggedOut = this.userLoggedOut.bind(this)
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

// used with login button to set state for conditional, need to verify that it doesnt set change state if incorrect login
userLoggedIn = () => {
    this.setState({
        loggedIn: true
    })
}

//used with logout button to set state for conditional
userLoggedOut = () => {
    console.log('logout clicked')
    this.setState({
        loggedIn: false
    })
}

    render() {
        return(
            <div>
                <button className="btn btn-primary mt-3" onClick={this.toggleLogin} >LOGIN</button>
                <button className="btn btn-primary mt-3" onClick={this.userLoggedOut} >LOG OUT</button> 
                <button className="btn btn-primary mt-3" onClick={this.toggleCreateUser} >CREATE USER</button> <br/>
                {
                    this.state.showLogin && <UserLogin loggedIn={this.userLoggedIn} loggedOut={this.userLoggedOut}/>
                }
                {
                    this.state.showCreateUser && <CreateUser />
                }
            </div>
        )
    }
}



export default UserSection