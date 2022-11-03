import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


class Login extends Component {

	constructor(props) {

        super(props);

        this.state = {
			email: '',
            username: '',
			password: '',
			loggedIn:false,
			firstLogIn:false,
			values: false,
			forgetPassword: false,
			sendOTP: false,
			enteredOTP: '',
			confirmPassword: '',
			createNewPassword: false
        };

		this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.forgetPassword = this.forgetPassword.bind(this);

	}

	componentDidMount() {
		if(window.token){
			this.setState({loggedIn:true});
		}
	}

	handleChange(event){
		let name=event.target.name;
		let value=event.target.value;
		 let data={};
		 data[name]=value;
  
		 this.setState(data);

	}
	createNewPassword(event) {
		let name=event.target.name;
		let value=event.target.value;
		 let data={};
		 data[name]=value;
  
		 this.setState(data);

		if (this.state.password != event.target.value){
			document.getElementById('ErrorMessage').innerHTML="Unmatching Passwords !";
		}
		else{
			document.getElementById('ErrorMessage').innerHTML="";
		}
	}
	render() {
		if(this.state.loggedIn){
			if (this.state.firstLogIn){
				return <Redirect to='/questionaire'/>
			}
			else{
		    	return <Redirect to='/dashboard'/>
			}
		}

		return (
			<Card className="cardStyle2">
				<Card.Body>
					<Card.Title className="cardTitleStyle">Welcome Back!</Card.Title>

					{this.state.forgetPassword ? 
		
					this.state.createNewPassword ? 
					<form class="flex-column" onSubmit = {this.forgetPassword}>
						<div class="form-group">
							<InputLabel htmlFor="outlined-adornment-new-password">Create New Password</InputLabel>
          					<OutlinedInput
            					id="outlined-adornment-new-password"
								name='password'
								className='outlinedInput'
								aria-describedby="passwordHelp"
								style={{height: '40px', width: '300px'}}
								type={this.state.values ? 'text' : 'password'}
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
						<div class="form-group">
							<InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
          					<OutlinedInput
            					id="outlined-adornment-confirm-password"
								name='confirmPassword'
								className='outlinedInput'
								aria-describedby="passwordHelp"
								style={{height: '40px', width: '300px'}}
            					type='password'
            					value={this.state.confirmPassword}
            					onChange={(e) => this.createNewPassword(e)}
								required
								inputProps={{pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,20}$', maxLength:'20'}}
          					/>
						</div>
						<p id="ErrorMessage"></p>
							<div class="mx-auto text-center p-0 col-md-12 mt-5 text-sm">
								<button className="btnSignUp">Create Password</button>
							</div>
					</form>

					:

					<form class="flex-column" onSubmit = {this.forgetPassword}>
						<div class="form-group">
							<InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          					<OutlinedInput
            					id="outlined-adornment-email"
								name='email'
								className='outlinedInput'
								aria-describedby="emailHelp"
								style={{height: '40px', width: '300px'}}
            					type='text'
            					value={this.state.email}
            					onChange={this.handleChange}
								required
          					/>
						</div>
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
									inputProps={{maxLength: '6'}}
					  			/>
							</div>
							:
							null
						}

						<p id="ErrorMessage"></p>
							<div class="mx-auto text-center p-0 col-md-12 mt-5 text-sm">
								<button className="btnSignUp">Send</button>
							</div>
					</form>

					:

					<form class="flex-column" onSubmit = {this.submit}>
					<div class="form-group">
						<InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
          				<OutlinedInput
            				id="outlined-adornment-username"
							name='username'
							className='outlinedInput'
							aria-describedby="usernameHelp"
							style={{height: '40px', width: '300px'}}
            				type='text'
            				value={this.state.username}
            				onChange={this.handleChange}
							required
          				/>
					</div>
					
					<div class="form-group">
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          				<OutlinedInput
            				id="outlined-adornment-password"
							name='password'
							className='outlinedInput'
							aria-describedby="passwordHelp"
							style={{height: '40px', width: '300px'}}
            				type={this.state.values ? 'text' : 'password'}
            				value={this.state.password}
            				onChange={this.handleChange}
							required
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

						<form class="flex-row" onSubmit = {this.submit}>

							<div class="mx-auto text-right p-0 col-md-12 mb-4 text-sm">
								<button style={{boxShadow: 'none', border: 'none', backgroundColor: 'inherit'}} class="text-dark font-weight-bold" onClick={() => this.setState({forgetPassword: true})}><u>Forgot Password</u></button>
							</div>
							<p id="ErrorMessage"></p>
							<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
								<button className="btnSignUp">LOGIN</button>
							</div>

						</form>
						<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
							</div>
							<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
							<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
							Don't have an account? 
								<a href="/create" class="ml-1 text-dark font-weight-bold"><u>Sign Up</u></a>
							</div>
							<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
								</div>
							</div>
					</form>
	}
				</Card.Body>
			</Card>
		)
	}

	forgetPassword(e){
		e.preventDefault();
		document.getElementById('ErrorMessage').innerHTML="Wait A Second.";
		axios.post('http://127.0.0.1:8103/api/db_update_user_password', {email: this.state.email, username: this.state.username, password: this.state.password, OTP: this.state.enteredOTP, machineOTP: this.state.machineOTP})
		.then(response => {
			if (this.state.createNewPassword){
				document.getElementById('ErrorMessage').innerHTML="New Password created successfully !!";
				setTimeout(() => {
					window.location.reload(true);
				}, 1000)
			}
			document.getElementById('ErrorMessage').innerHTML="";
			console.log(response.data)
			this.setState({sendOTP: !this.state.sendOTP}, () =>{
				if (this.state.sendOTP){
						document.getElementById('ErrorMessage').innerHTML="";
						this.setState({machineOTP: response.data.machineOTP});
				}else{
					this.setState({createNewPassword:true})
				}
			})
		})
		.catch(err => {
			document.getElementById('ErrorMessage').innerHTML="Unregistered Email";
		})
	}

    submit(e) {
		e.preventDefault();
		//Check if this is the first login
		axios.post('http://127.0.0.1:8103/api/db_last_login', {username: this.state.username})
		.then(response => {
			console.log(response);
			this.state.firstLogIn = (response.data == "N/A");
			console.log(this.state.firstLogIn);
			axios.post('http://127.0.0.1:8103/api/db_login', {username: this.state.username, password: this.state.password })
				.then(response => {
					console.log(response);
					localStorage.setItem('token', response.data)
					localStorage.setItem('username', (this.state.username))
					console.log(localStorage.getItem('username'))

					axios.post('http://127.0.0.1:8103/api/db_get_user_type', {username: this.state.username})
					.then(response => {
						console.log(response);
						localStorage.setItem('usertype', response.data)
						this.setState({loggedIn:true});
						console.log(localStorage.getItem('usertype'))
					})
					.catch((error) => {
						console.log(error)
				});
			})
			.catch((error) => {
				document.getElementById('ErrorMessage').innerHTML="Incorrect Username or Password";
				console.log(error)
			})
		}).catch((error) => {
			document.getElementById('ErrorMessage').innerHTML="No user with this username found. Please enter correct username or make a account first.";
			console.log(error)
		});
    }
}

export default Login;