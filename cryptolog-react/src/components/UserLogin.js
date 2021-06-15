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
    }

    // *** FUNCTIONS ***
    handleChange(event){
        this.setState({ [event.currentTarget.id] : event.currentTarget.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch(baseURL + '/users' , {
            method: 'POST',
            body: JSON.stringify({
                userNameLogin: this.state.userName,
                passwordLogin: this.state.password,
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        .then(resJson => {
            this.props.addinfunctionthatispulledfromappjs(resJson)
            Array.from(document.querySelectorAll('input')).forEach(input => (input.value =""));
            this.setState({
                userNameLogin: '',
                passwordLogin: '',
            })
        })
        .catch(error => console.log({ 'Error' : error}))
    }


    render() {
        return(
            <div>
                <h2>User Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="userNameLogin" className="form-label">User Name</label>
                        <input onChange={this.handleChange} type="email" className="form-control" name="userNameLogin" id="userNameLogin" placeholder="kasmo.kramer@hotmail.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordLogin" className="form-label">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" name="passwordLogin" id="passwordLogin" placeholder="bosco" />
                    </div>
                    <input type='submit' value='Login'></input>
                </form>
            </div>

        )
    }
}


export default UserLogin