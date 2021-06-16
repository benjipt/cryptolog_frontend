import {Component} from 'react'

const baseURL = 'http://localhost:3003'

class UserLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            userNameLogin: '',
            passwordLogin: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // *** FUNCTIONS ***
    handleChange(event){
        this.setState({ [event.currentTarget.id] : event.currentTarget.value })
    }

    handleSubmit(event) {
        console.log('logged in as ' + this.state.userNameLogin)
        event.preventDefault()
        fetch(baseURL + '/sessions', {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.userNameLogin,
                userPassword: this.state.passwordLogin,
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        // .then(resJson => {
        //     this.props.addinfunctionthatispulledfromappjs(resJson)
        //     Array.from(document.querySelectorAll('input')).forEach(input => (input.value =""));
        //     this.setState({
        //         userNameLogin: '',
        //         passwordLogin: '',
        //     })
        // })
        // .catch(error => console.log({ 'Error' : error}))
    }


    render() {
        return(
            <div>
                <h2>User Login</h2>
                <form onSubmit={ this.handleSubmit }>
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