import {Component} from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://cryptolog-api.herokuapp.com';
}

class UserLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            userNameLogin: '',
            passwordLogin: '',
            loggedIn: false,
            passwordMatch: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // *** FUNCTIONS ***
    handleChange(event){
        this.setState({ [event.currentTarget.id] : event.currentTarget.value })
    }

    handleSubmit(event) {
        console.log('logged in as ' + this.state.userNameLogin)
        event.preventDefault()
        console.log('front end line 24 ' + this.state.loggedIn)     //this is working
        
        fetch(baseURL + '/sessions' , {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.userNameLogin,
                userPassword: this.state.passwordLogin,
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        .then(resJson => {
            // this.props.addinfunctionthatispulledfromappjs(resJson)
            Array.from(document.querySelectorAll('input')).forEach(input => (input.value =""));
            console.log(resJson)
            this.setState({
                userNameLogin: '',
                passwordLogin: '',
                loggedIn: true,
                userId: resJson._id,
                userName: resJson.userName,
            })
            this.props.toggleLoggedIn()         //MM: I dont think this is used, may have been from my old code
            this.props.toggleLoginForm(resJson._id , resJson.userName)
        })
        .catch(error => console.log({ 'Error' : error}))
        console.log('incorrect pass')
        this.setState({
            passwordMatch: !this.state.passwordMatch
       })
    }


    render() {
        return(
            <div className="mt-4 mb-4">
                <h2>User Login</h2>
                { this.state.passwordMatch ? null : <h5>PASSWORD DOES NOT MATCH</h5> }
                <form onSubmit={ this.handleSubmit } >
                    <div className="mb-3">
                        <label htmlFor="userNameLogin" className="form-label">User Name</label>
                        <input onChange={this.handleChange} type="email" className="form-control" name="userNameLogin" id="userNameLogin" placeholder="george.costanza@hotmail.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordLogin" className="form-label">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" name="passwordLogin" id="passwordLogin" placeholder="bosco" />
                    
                    </div>
                    <div className="d-grid gap-2">
                        <input className="btn btn-primary" type='submit' value='Login'></input>
                    </div>
                </form>
            </div>

        )
    }
}


export default UserLogin