import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Redirect } from 'react-router-dom'
import { CircularProgress, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@material-ui/core';
import { Email, Info, Visibility, VisibilityOff } from '@material-ui/icons';
import AxiosBaseFile from '../AxiosBaseFile';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import FacebookLogin from 'react-facebook-login';

class createAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			username: '',
			password: '',
			user_type: '',
			instituteId: null,
			enteredOTP: '',
			institute: false,
			values: false,
			sendOTP: false,
			loading: false,
			signInOptions: true,
			firstLogIn: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.onclick = this.onClick = this.onclick.bind(this);
		this.suggestUsername = this.suggestUsername.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			if (document.cookie.split(";").some((item) => item.trim().startsWith("g_state="))) {
				const allTheButton = document.querySelectorAll('.signUpButtonContainers button');
				for (let x of allTheButton) {
					x.style.width = '222px'
				}
			}
		}, 2000)
	}
	onclick(event) {
		let name = event.target.name;
		let value = event.target.value;
		let data = {};
		data[name] = value;

		if (value == 'student' || value == 'instructor' || value == 'institute') {
			this.setState({ institute: true })
		} else {
			this.setState({ institute: false })
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

	suggestUsername() {
		var firstname = this.state.firstname;

		if (firstname.length > 1) {
			let additionalCharacters = 9 - firstname.length;
			var additionString = '_'
			for (let i = 0; i < additionalCharacters; i++) {
				let x = Math.floor(Math.random() * 10);
				var additionString = additionString + x;
			}
			var username = firstname.toLowerCase() + additionString;
			this.setState({ username: username })
		}
	}

	signInWithGoogle(credentialResponse) {
		const userCredentials = jwt_decode(credentialResponse.credential);
		const formData = new FormData();
		formData.append('user_type', 'normal');
		formData.append('email', userCredentials.email);
		formData.append('name', userCredentials.name);
		formData.append('firstname', userCredentials.given_name);
		formData.append('lastname', userCredentials.family_name);

		Axios.get(userCredentials.picture, {
			responseType: 'blob'
		})
			.then(response => {
				formData.append('profilePicture', response.data);
			})
			.catch(err => console.log(err));

		this.signInWithThirdParty(formData);
	}

	signInWithFacebook(userCredentials) {
		const formData = new FormData();
		const given_name = userCredentials.name.split(' ')[0];
		const family_name = userCredentials.name.split(' ')[1];

		formData.append('user_type', 'normal');
		formData.append('email', userCredentials.email);
		formData.append('name', userCredentials.name);
		formData.append('firstname', given_name);
		formData.append('lastname', family_name);

		Axios.get(userCredentials.picture.data.url, {
			responseType: 'blob'
		})
			.then(response => {
				formData.append('profilePicture', response.data);
			})
			.catch(err => console.log(err));

		this.signInWithThirdParty(formData);
	}

	signInWithLinkedIn(credentialResponse) {
		const body = {
			'grant_type': "authorization_code",
			'code': credentialResponse,
			'redirect_uri': `${window.location.origin}/linkedin`,
			'client_id': "77jps0wbeeqxux",
			'client_secret': "MTqfKjBZFKiOJVrB"
		}
		let config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		};
		Axios.post('https://www.linkedin.com/oauth/v2/accessToken', body, config)
			.then(res => {
				let authorisationConfig = {
					headers: {
						"Authorization": `Bearer ${res.data.access_token}`
					}
				}
				Axios.get('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', authorisationConfig)
					.then(res => {
						const responseData = res.data;

						const formData = new FormData();

						const given_name = responseData.firstName.localized.en_US;
						const family_name = responseData.lastName.localized.en_US;
						const name = given_name + ' ' + family_name;

						formData.append('user_type', 'normal');
						formData.append('name', name);
						formData.append('firstname', given_name);
						formData.append('lastname', family_name);

						Axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', authorisationConfig)
							.then(res => {
								const responseEmail = res.data;
								formData.append('email', responseEmail['elements'][0]['handle~']['emailAddress']);
							})

						Axios.get(responseData['profilePicture']['displayImage~']['elements'][1]['identifiers'][0]['identifier'], { responseType: 'blob' })
							.then(response => {
								formData.append('profilePicture', response.data);
							})
							.catch(err => console.log(err));

						this.signInWithThirdParty(formData);
					})
					.catch(err => {
						alert('Try to Sign in another way');
						console.warn(err);
					})
			})
			.catch(err => {
				alert('Try to Sign in another way');
				console.warn(err);
			})
	}

	signInWithThirdParty(formData) {
		AxiosBaseFile.post('/api/db_sign_in_with_third_parties', formData)
			.then(response => {
				let responseData = response.data;

				localStorage.setItem('token', true)
				localStorage.setItem('usertype', responseData.user_type)
				localStorage.setItem('username', responseData.username)
				localStorage.setItem('profilePicture', responseData.profilePicture)
				localStorage.setItem('name', responseData.name)

				if (responseData.last_login == 'N/A') {
					this.setState({ firstLogIn: true })
				}
				else {
					this.setState({ firstLogIn: false })
				}
			})
			.catch(err => console.log(err))
	}


	render() {
		if (this.state.firstLogIn == true) {
			return <Redirect to='/questionaire' />
		}
		if (this.state.firstLogIn == false) {
			return <Redirect to='/dashboard' />
		}
		if (this.state.accountCreated) {
			return <Redirect to='/login' />
		}
		localStorage.clear()

		return (
			<Card className="cardStyle2 overflow-auto">
				<Helmet>
					<title>
						Sign up - Finemate
					</title>
					<meta name='keywords' content="Retention Engine, Revision, Serial Recall, Cognitive Science, Learning, Education, Memorization, Memory, Long-Term Memory, E-Learning, Flashcards, Leitner System, Forget Things, Student Management System, Social Learning Platform, Retention, Revise, Learning Management System, Cognitive Abilities" />
					<meta name='description' content="Create Account to Learn & Retain better." />
				</Helmet>
				<Card.Body>
					<Card.Title className="cardTitleStyle">Create an Account</Card.Title>

					{this.state.signInOptions ?
						<div className='signUpButtonContainers'>
							<div>
								<GoogleLogin
									onSuccess={(credentialResponse) => {
										this.signInWithGoogle(credentialResponse);
									}}
									onError={() => {
										console.log('Login Failed');
									}}
									theme='filled_blue'
								/>
							</div>
							<div>
								<LinkedIn
									clientId="77jps0wbeeqxux"
									redirectUri={`${window.location.origin}/linkedin`}
									onSuccess={(credentialResponse) => {
										this.signInWithLinkedIn(credentialResponse);
									}}
									onError={(error) => {
										console.log(error);
									}}
									scope="r_emailaddress r_liteprofile w_member_social"
								>
									{({ linkedInLogin }) => (
										<button className='linkedInBtn' onClick={linkedInLogin}>
											<i class="fa fa-linkedin" aria-hidden="true"></i> Sign in with LinkedIn
										</button>
									)}
								</LinkedIn>
							</div>
							<div className='facebookBtn'>
								<FacebookLogin
									appId="574266974631240"
									textButton='Sign in with Facebook'
									fields="name,email,picture"
									callback={(credentialResponse) => {
										this.signInWithFacebook(credentialResponse);
									}}
									cssClass="my-facebook-button-class"
									icon="fa fa-facebook"
								/>
							</div>
							<div>
								<button className='emailBtn' onClick={() => this.setState({ signInOptions: !this.state.signInOptions })}>
									<i class="fa fa-envelope" aria-hidden="true"></i> Sign in with Email
								</button>
							</div>
						</div>
						:
						<form class="flex-column signUpForm" onSubmit={(e) => { { this.state.sendOTP ? this.submit2(e) : this.submit1(e) } }}>

							<div class="d-flex flex-wrap">
								<div>
									<InputLabel htmlFor="inputFirstName">First Name</InputLabel>
									<OutlinedInput
										id="inputFirstName"
										type="text"
										name='firstname'
										className='outlinedInputName outlinedInputFirstName'
										aria-describedby="nameHelp"
										style={{ height: '40px' }}
										value={this.state.firstname}
										onChange={this.handleChange}
										onBlur={this.suggestUsername}
										required
									/>
								</div>

								<div>
									<InputLabel htmlFor="inputLastName">Last Name</InputLabel>
									<OutlinedInput
										id="inputLastName"
										type="text"
										name='lastname'
										className='outlinedInputName'
										aria-describedby="nameHelp"
										style={{ height: '40px' }}
										value={this.state.lastname}
										onChange={this.handleChange}
										required
									/>
								</div>
							</div>


							<div>
								<InputLabel htmlFor="inputEmail">Email</InputLabel>
								<OutlinedInput
									id="inputEmail"
									name='email'
									className='outlinedInput'
									aria-describedby="emailHelp"
									style={{ height: '40px', width: '300px' }}
									value={this.state.email}
									onChange={this.handleChange}
									inputProps={{ type: 'email' }}
									required
								/>
							</div>


							<div>
								<div className='d-flex'>
									<InputLabel htmlFor="inputPassword">Username</InputLabel>
									<Tooltip title="Username can only contain lowercase letters (a-z), underscore (_), numbers (0-9) and should be of minimum 8 characters. Elon@Musk &#x2717; &nbsp; &nbsp; elon_musk &#x2713; ">
										<Info style={{ color: '#717175', fontSize: '1em', marginLeft: '0.5em' }} />
									</Tooltip>
								</div>
								<OutlinedInput
									id="inputUsername"
									type="text"
									name='username'
									className='outlinedInput'
									aria-describedby="usernameHelp"
									style={{ height: '40px', width: '300px' }}
									value={this.state.username}
									onChange={this.handleChange}
									required
									inputProps={{ pattern: "^[a-z][a-z0-9_]{8,25}$", maxLength: '25' }}
								/>
							</div>

							<div>
								<div className='d-flex'>
									<InputLabel htmlFor="inputPassword">Password</InputLabel>
									<Tooltip title="Password must contain a uppercase letter (A-Z), a lowercase letter (a-z), a special characters (@_-), a number (0-9) and should be of minimum 8 characters.">
										<Info style={{ color: '#717175', fontSize: '1em', marginLeft: '0.5em' }} />
									</Tooltip>
								</div>
								<OutlinedInput
									id="inputPassword"
									type={this.state.values ? 'text' : 'password'}
									name='password'
									className='outlinedInput'
									aria-describedby="passwordHelp"
									style={{ height: '40px', width: '300px' }}
									value={this.state.password}
									onChange={this.handleChange}
									required
									inputProps={{ pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,25}$', maxLength: '25' }}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => this.setState({ values: !this.state.values })}
												edge="end"
											>
												{this.state.values ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</div>
							{this.state.institute ?
								<div>
									<div className='d-flex'>
										<InputLabel htmlFor="inputIdentity">Identity Number</InputLabel>
										<Tooltip title="If you are a student, or teacher of our partner institute, please enter the 10 digit id given to you by your institute, or go with the Normal Account.">
											<Info style={{ color: '#717175', fontSize: '1em', marginLeft: '0.5em' }} />
										</Tooltip>
									</div>
									<OutlinedInput
										id="inputIdentity"
										type="text"
										name='instituteId'
										className='outlinedInput'
										aria-describedby="identityHelp"
										style={{ height: '40px', width: '300px' }}
										value={this.state.instituteId}
										onChange={this.handleChange}
										inputProps={{ pattern: "[0-9]{10}", maxLength: '10' }}
										required
									/>
								</div>
								: null}
							<form class="flex-row" onSubmit={this.submit}>
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
								<div>
									<InputLabel htmlFor="inputOTP">Enter OTP sent on Email</InputLabel>
									<OutlinedInput
										id="inputOTP"
										type="text"
										name='enteredOTP'
										className='outlinedInput'
										aria-describedby="otpHelp"
										style={{ height: '40px', width: '300px' }}
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
									<button className="btnSignUp">
										Send OTP
										{this.state.loading && (
											<CircularProgress
												size={13}
												style={{
													color: 'white',
													marginLeft: '0.5em'
												}}
											/>
										)}
									</button>
								</div>
								:
								<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
									<button className="btnSignUp">
										SIGN UP
										{this.state.loading && (
											<CircularProgress
												size={13}
												style={{
													color: 'white',
													marginLeft: '0.5em'
												}}
											/>
										)}
									</button>
								</div>
							}
							<div class="mx-auto text-center p-0 col-md-12 text-sm">
								Already have an account?
								<a href="/login" class="ml-1 text-dark font-weight-bold"><u>Log in</u></a>
							</div>
							<div class="form-group pt-2 pl-2 pr-2 mt-5">
								<small class="form-text text-muted">*By sharing your email, you agree to our Offer <a href="">Terms</a>, <a href="">Terms of Service</a>, and <a href="">Privacy Policy.</a></small>
							</div>

						</form>
					}
				</Card.Body>
			</Card >

		);
	}

	submit1(e) {
		e.preventDefault();
		this.setState({ loading: true })
		document.getElementById('ErrorMessage').innerHTML = "Wait A Second";

		if (this.state.instituteId) {
			document.getElementById('ErrorMessage').innerHTML = "Invalid Identity Number";
			this.setState({ loading: false })
		} else {
			AxiosBaseFile.post('/api/db_create_user', { firstname: this.state.firstname, lastname: this.state.lastname, user_type: this.state.user_type, email: this.state.email, username: this.state.username, password: this.state.password, OTP: this.state.enteredOTP })
				.then(response => {
					document.getElementById('ErrorMessage').innerHTML = "";
					this.setState({ sendOTP: true, machineOTP: response.data, loading: false });
				})
				.catch((error) => {
					this.setState({ loading: false })
					document.getElementById('ErrorMessage').innerHTML = "Username or Email is Already in Use. Please Enter different Username and/or Email."
					console.log(error)
				});
		}
	}
	submit2(e) {
		e.preventDefault();
		this.setState({ loading: true })
		AxiosBaseFile.post('/api/db_create_user', { firstname: this.state.firstname, lastname: this.state.lastname, user_type: this.state.user_type, email: this.state.email, username: this.state.username, password: this.state.password, OTP: this.state.enteredOTP, machineOTP: this.state.machineOTP })
			.then(response => {
				this.setState({ accountCreated: true, loading: false });
			})
			.catch((error) => {
				this.setState({ loading: false })
				document.getElementById('ErrorMessage').innerHTML = "Incorrect OTP";
				console.log(error)
			});
	}
}

export default createAccount;
