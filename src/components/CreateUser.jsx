import {Component} from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://cryptolog-api.herokuapp.com';
}


class CreateUser extends Component{
    constructor(props){
        super(props)
            this.state = {
                userName: '',
                password: '',
                passwordCheck: '',
                passwordsMatch: true,
            }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // *** FUNCTIONS *** 
    handleChange(event){
        this.setState({ [event.currentTarget.id] : event.currentTarget.value })
        setTimeout(() => {
            if (this.state.password === this.state.passwordCheck) {
                this.setState({
                    passwordsMatch: true
                })
            } else { this.setState({ passwordsMatch: false })}
        }, 100)
    }

    handleSubmit(event) {
        event.preventDefault()
        if(this.state.password === this.state.passwordCheck) {
            fetch(baseURL + '/users', {
                method: 'POST',
                body: JSON.stringify({
                    userName: this.state.userName,
                    userPassword: this.state.password,
                }),
                headers: {
                'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                  );
                this.setState({
                    userName: '',
                    password: '',
                })
                this.props.toggleCreateUser()
            
            } else(
                this.setState({ passwordsMatch: false })
            )
       
        }



    render(){
        return(
            <div className="mt-4">
                <h2>CREATE A NEW USER</h2>
                { !this.state.passwordsMatch &&
                    <h5>PASSWORDS DO NOT MATCH!</h5>
                }
                <form onSubmit={ this.handleSubmit }>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User Name</label>
                        <input onChange={this.handleChange} type="email" className="form-control" name="userName" id="userName" placeholder="george.costanza@hotmail.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" name="password" id="password" placeholder="bosco" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordCheck" className="form-label">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" name="passwordCheck" id="passwordCheck" placeholder="bosco" />
                    </div>
                    <div className="d-grid gap-2">
                        <input className="btn btn-primary" type='submit' value='Create New User' />
                    </div>
                </form>
            </div>
        )
    }
}



export default CreateUser