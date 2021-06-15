import {Component} from 'react'

class CreateUser extends Component{
    constructor(props){
        super(props)
            this.state = {
                userName: '',
                password: '',
                passwordCheck: '',
            }
            this.handleChange = this.handleChange.bind(this)
    }

    // *** FUNCTIONS *** 
    handleChange(event){
        this.setState({ [event.currentTarget.id] : event.currentTarget.value })
    }



    render(){
        return(
            <div>
                <h2>CREATE A NEW USER</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User Name</label>
                        <input onChange={this.handleChange} type="email" className="form-control" name="userName" id="userName" placeholder="kasmo.kramer@hotmail.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={this.handleChange} type="string" className="form-control" name="password" id="password" placeholder="bosco" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordCheck" className="form-label">Password</label>
                        <input onChange={this.handleChange} type="string" className="form-control" name="passwordCheck" id="passwordCheck" placeholder="bosco" />
                    </div>
                    <input type='submit' value='Create New User'></input>
                </form>
            </div>
        )
    }
}



export default CreateUser