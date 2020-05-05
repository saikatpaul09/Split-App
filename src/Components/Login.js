import React, { Component } from 'react'  



import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const formValid = ({formErrors, ...rest})=> {
  let valid = true;
  Object.values(formErrors).forEach(val =>{val.length > 0 && (valid= false);
  });
  Object.values(rest).forEach(val =>{
    val && (valid=false)
  });
  return valid;
};
class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       firstName:null,
       lastName:null,
       email:null,
       password:null,
       formErrors:{
        firstName:"",
        lastName:"",
        email:"",
        password:""
       }
    };
  }
  handleSubmit=e=>{
    e.preventDefault();
    if(formValid(this.state.formErrors)){
      console.log(`
      --submitting--
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email ID: ${this.state.email}
      Password: ${this.state.password}
      `)
    }else{
      console.error("Form INVALID - DISPLAY ERROR MESSAGE");
    }
    
  };

  handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrors = this.state.formErrors;
    switch(name){
      case 'firstName':
        formErrors.firstName = value.length<3  ?"minimum 3 characters required":"";
        break;
        case 'lastName':
        formErrors.lastName = value.length<3 ?"minimum 3 characters required":"";
        break;
        case 'email':
        formErrors.email = emailRegex.test(value)?"":"Invalid email ID";
        break;
        case 'password':
        formErrors.password = value.length<8 ?"minimum 8 characters required":"";
        break;
        default:
        break;
    }
    this.setState({formErrors, [name]:value},()=>console.log(this.state))
  }
  render() {
    const {formErrors} =this.state;
    return (
      
      <div className="wrapper">
      <h1>WELCOME TO SPLIT BILL </h1>
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="firstName">
          <label htmlFor="firstName">First Name</label>
          <input 
          className ={formErrors.firstName.length>0?"error":null }
          placeholder="First Name"
          type="text" 
          name="firstName" 
          noValidate
          onChange={this.handleChange}
          />
          {formErrors.firstName.length>0 && (
            <span className ="errorMessage">{formErrors.firstName}</span>
          )}
          </div>
          <div className="lastName">
          <label htmlFor="lastName">Last Name</label>
          <input  
          className ={formErrors.lastName.length>0?"error":null }
          placeholder="Last Name"
          type="text" 
          name="lastName" 
          noValidate
          onChange={this.handleChange}
          />
          {formErrors.lastName.length>0 && (
            <span className ="errorMessage">{formErrors.lastName}</span>
          )}
          </div>
          <div className="email">
          <label htmlFor="email">EmailID</label>
          <input 
          className ={formErrors.email.length>0?"error":null } 
          placeholder="Enter emailID"
          type="email" 
          name="email" 
          noValidate
          onChange={this.handleChange}
          />
          
          </div>
          <div className="password">
          <label htmlFor="password">Password</label>
          <input 
          className ={formErrors.password.length>0?"error":null }
          placeholder="Enter Password"
          type="password" 
          name="password" 
          noValidate
          onChange={this.handleChange}
          />
          {formErrors.password.length>0 && (
            <span className ="errorMessage">{formErrors.password}</span>
          )}
          </div>
          <div className="createAccount">
          <button type="submit"> Create Account </button> 
          <small>Already Have an Account?Already Have an Account?</small>
          </div>
        </form>

      </div>
    </div>
      
    );
  }
}

export default Login
