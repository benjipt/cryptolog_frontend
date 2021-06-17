import {Component} from 'react'
// const baseURL = 'http://localhost:3003'      //pre heroku

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
            }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // *** FUNCTIONS *** 
    handleChange(event){
        this.setState({ [event.currentTarget.id] : event.currentTarget.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        let pw1 = this.state.password
        let pw2 = this.state.passwordCheck
        // need some type of if statement to allow the fetch request to happen, not sure what to do if the if statement fails?
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
            // .then(resJson => {
            // this.props.handleAddTransaction(resJson)
            // // Reset Form fields: https://www.freecodecamp.org/news/how-to-clear-input-values-of-dynamic-form-in-react/
            // Array.from(document.querySelectorAll("input")).forEach(
            //     input => (input.value = "")
            //   );
            // this.setState({
            //     userName: '',
            //     password: '',
                
            // })
            // })
            // .catch(error => console.log({ 'Error': error }))
            // Reset Form fields: https://www.freecodecamp.org/news/how-to-clear-input-values-of-dynamic-form-in-react/
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
              );
            this.setState({
                userName: '',
                password: '',
            })
            this.props.toggleCreateUser()
        }



    render(){
        return(
            <div className="mt-4">
                <h2>CREATE A NEW USER</h2>
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