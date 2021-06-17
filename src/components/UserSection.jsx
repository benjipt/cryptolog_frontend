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
            loggedIn: false,
            showLoginForm: false,
            showCreateUserForm : false,
        }

        this.toggleLoginForm = this.toggleLoginForm.bind(this)
        this.toggleCreateUserForm = this.toggleCreateUserForm.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    // *** FUNCTIONS ***
    toggleLoginForm = () => {
        this.setState({
            loggedIn: this.props.loggedIn,
            showLoginForm: !this.state.showLoginForm
        })
    }

    toggleCreateUserForm = () => {
        this.setState({
            showCreateUser: !this.state.showCreateUserForm
        })
    }

    handleLogOut() {
        this.setState({ loggedIn: false })
        this.props.toggleLoggedIn()
    }

    render() {
        return(
            <div className="mt-3">
                { !this.state.loggedIn &&
                <button className="btn btn-primary me-2" onClick={this.toggleLoginForm}>LOGIN</button> }
                { this.state.loggedIn && 
                <button className="btn btn-primary me-2" onClick={this.handleLogOut} >LOG OUT</button> }
                { !this.state.loggedIn &&
                <button className="btn btn-primary" onClick={this.toggleCreateUserForm} >CREATE USER</button> }
                {
                    this.state.showLoginForm && 
                    <UserLogin 
                        toggleLoggedIn={this.props.toggleLoggedIn}
                        toggleLoginForm={this.toggleLoginForm} />
                }
                {
                    this.state.showCreateUser &&
                    <CreateUser
                        toggleCreateUser={this.toggleCreateUserForm}
                    />
                }
            </div>
        )
    }
}



export default UserSection