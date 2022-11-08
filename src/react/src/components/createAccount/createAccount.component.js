import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import {Redirect} from 'react-router-dom'
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import AxiosBaseFile from '../AxiosBaseFile';


class createAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username:'',
			password: '',
			user_type:'',
			instituteId: '',
			enteredOTP: '',
			institute: false,
			values: false,
			sendOTP: false
        };

		this.handleChange = this.handleChange.bind(this);
		this.onclick = this.onClick = this.onclick.bind(this);
	}
	
	onclick(event){
		let name = event.target.name;
		let value = event.target.value;
		let data ={};
		data[name] = value;

		if (value == 'student' || value=='instructor' || value== 'institute'){
			this.setState({institute: true})
		}else{
			this.setState({institute: false})
		}
		this.setState(data)
	}

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;

        this.setState(data);
	}
	
    render() {
		if(this.state.accountCreated){
			return <Redirect to='/login' />
		  }
        return (
	<Card className="cardStyle2 overflow-auto">
	<Card.Body>
		<Card.Title className="cardTitleStyle">Create an Account</Card.Title>
		<form class="flex-column" onSubmit={(e) => {{this.state.sendOTP ? this.submit2(e) : this.submit1(e)}}}>
			<div class="form-group">
				<InputLabel htmlFor="inputEmail">Email</InputLabel>
          				<OutlinedInput
            				id="inputEmail"
							name='email'
							className='outlinedInput'
							aria-describedby="emailHelp"
							style={{height: '40px', width: '300px'}}
            				value={this.state.email}
            				onChange={this.handleChange}
							inputProps={{type: 'email'}}
							required
          				/>
			</div>
			<div class="form-group">
				<InputLabel htmlFor="inputUsername">Username</InputLabel>
          				<OutlinedInput
            				id="inputUsername"
							type="text"
							name='username'
							className='outlinedInput'
							aria-describedby="usernameHelp"
							style={{height: '40px', width: '300px'}}
            				value={this.state.username}
            				onChange={this.handleChange}
							required
							inputProps={{pattern: "^[A-Za-z][A-Za-z0-9_]{8,20}$", maxLength:'20'}}	
          				/>

			</div>
			<div class="form-group">
				<InputLabel htmlFor="inputPassword">Password</InputLabel>
          				<OutlinedInput
            				id="inputPassword"
							type={this.state.values ? 'text' : 'password'}
							name='password'
							className='outlinedInput'
							aria-describedby="passwordHelp"
							style={{height: '40px', width: '300px'}}
            				value={this.state.password}
            				onChange={this.handleChange}
							required
							inputProps={{pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,20}$', maxLength:'20'}}
							endAdornment={
								<InputAdornment position="end">
								  <IconButton
										aria-label="toggle password visibility"
										onClick={() => this.setState({values: ! this.state.values})}
										edge="end"
									  >
										{this.state.values ? <VisibilityOff /> : <Visibility />}
								  </IconButton>
								</InputAdornment>
						  }
          				/>
			</div>
			{this.state.institute ? 
			<div class="form-group">
				<InputLabel htmlFor="inputIdentity">Identity Number</InputLabel>
          				<OutlinedInput
            				id="inputIdentity"
							type="text"
							name='identity'
							className='outlinedInput'
							aria-describedby="identityHelp"
							style={{height: '40px', width: '300px'}}
            				value={this.state.instituteId}
            				onChange={this.handleChange}
							inputProps={{pattern: "[0-9]{10}"}}
          				/>
			</div>
	: null }
			<form class="flex-row" onSubmit = {this.submit}>
				<div class="form-group  mt-5">
					<label class="text-dark font-weight-bold">Are you joining as a Student or Instructor?</label>
					<small class="form-text text-muted">Please select your answer below.</small>
				</div>
				<div class="btn-toolbar mb-5" role="toolbar" aria-label="Toolbar with button groups">
					<div class="btn-group" id="userNormal">
						<button type="button" class="btn btn-outline-secondary" name='user_type' value={'normal'} onClick={this.onclick} >Normal</button>
					</div>
					<div class="btn-group" id="userStudent">
						<button type="button" class="btn btn-outline-secondary" name='user_type' value={'student'} onClick={this.onclick} >Student</button>
					</div>
					<div class="btn-group" id="userInstructor">
					<button type="button" class="btn btn-outline-secondary" name='user_type' value={'instructor'} onClick={this.onclick} >Instructor</button>
					</div>
					<div class="btn-group" id="userInstitute">
					<button type="button" class="btn btn-outline-secondary" name='user_type' value={'institute'} onClick={this.onclick} >Institute</button>
					</div>
				</div>
			</form>
			{this.state.sendOTP ? 
				<div class="form-group">
					<InputLabel htmlFor="inputOTP">Enter OTP</InputLabel>
					  <OutlinedInput
						id="inputOTP"
						type="text"
						name='enteredOTP'
						className='outlinedInput'
						aria-describedby="otpHelp"
						style={{height: '40px', width: '300px'}}
						value={this.state.enteredOTP}
						onChange={this.handleChange}
						required
					  />
				</div>
			:
			null
			}
			<p id="ErrorMessage"></p>
			{this.state.sendOTP ?
				<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
					<button className="btnSignUp">Send OTP</button>
				</div>
			:
				<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
					<button className="btnSignUp">SIGN UP</button>
				</div>
			}
			<div class="mx-auto text-center p-0 col-md-12 text-sm">
				Already have an account? 
				<a href="/login" class="ml-1 text-dark font-weight-bold"><u>Log in</u></a>
			</div>
			<div class="form-group pt-2 pl-2 pr-2 mt-5">
						<small class="form-text text-muted">*By sharing your email, you agree to our Offer Terms, Terms of Service, and Privacy Policy.</small>
					</div>

		</form>
	</Card.Body>
</Card>

        );
    }

    submit1(e) {
        e.preventDefault();
		document.getElementById('ErrorMessage').innerHTML="Wait A Second.";

        AxiosBaseFile.post('/api/db_create_user', {user_type:this.state.user_type, email: this.state.email,username:this.state.username, password: this.state.password, OTP: this.state.enteredOTP })
            .then(response => {
				document.getElementById('ErrorMessage').innerHTML="";
				this.setState({sendOTP:true, machineOTP: response.data});
				})
			.catch((error) => {
				document.getElementById('ErrorMessage').innerHTML="Username or Email is Already in Use. Please Enter different Username and/or Email."
			console.log(error)
		});
    }
	submit2(e) {
        e.preventDefault();

        AxiosBaseFile.post('/api/db_create_user', {user_type:this.state.user_type, email: this.state.email,username:this.state.username, password: this.state.password, OTP: this.state.enteredOTP, machineOTP: this.state.machineOTP })
            .then(response => {
				this.setState({accountCreated:true});
				})
			.catch((error) => {
				document.getElementById('ErrorMessage').innerHTML="Incorrect OTP";
			console.log(error)
		});
    }
}

export default createAccount;
