import React, { Component, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Redirect } from 'react-router-dom'
import { CircularProgress, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@material-ui/core';
import { Info, Visibility, VisibilityOff } from '@material-ui/icons';
import AxiosBaseFile from '../AxiosBaseFile';
import { Helmet } from 'react-helmet';
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import FacebookLogin from 'react-facebook-login';

function LoginWithThirdParties() {
	const [firstLogIn, setFirstLogin] = useState(null)

	const loginWithGoogle = useGoogleLogin({
		onSuccess: credentialResponse => {
			let authorisationConfig = {
				headers: {
					"Authorization": `Bearer ${credentialResponse.access_token}`
				}
			}

			//https://react-oauth.vercel.app different ways to authenticate and authorize using google
			Axios.get('https://www.googleapis.com/oauth2/v3/userinfo/', authorisationConfig)
				.then(res => {
					const userCredentials = res.data;
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

					signInWithThirdParty(formData);
				})
				.catch(err => console.warn(err))

		},
		onError: () => {
			console.log('Login Failed');
		}
	});

	const loginWithFacebook = (userCredentials) => {
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

		signInWithThirdParty(formData);
	}

	const loginWithLinkedin = (credentialResponse) => {
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
						alert('Try to log in another way');
						console.warn(err);
					})
			})
			.catch(err => {
				alert('Try to log in another way');
				console.warn(err);
			})
	}


	function signInWithThirdParty(formData) {
		AxiosBaseFile.post('/api/db_sign_in_with_third_parties', formData)
			.then(response => {
				let responseData = response.data;

				localStorage.setItem('token', true)
				localStorage.setItem('usertype', responseData.user_type)
				localStorage.setItem('username', responseData.username)
				localStorage.setItem('profilePicture', responseData.profilePicture)
				localStorage.setItem('name', responseData.name)

				if (responseData.last_login == 'N/A') {
					setFirstLogin(true);
				}
				else {
					setFirstLogin(false);
				}
			})
			.catch(err => console.log(err))
	}

	if (firstLogIn == false) {
		return <Redirect to='/dashboard' />
	} else if (firstLogIn == true) {
		return <Redirect to='/questionaire' />
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto 20%' }}>
			<div>
			<IconButton style={{ backgroundColor: '#4285F4', color: '#fff', width: '45px', height: '45px' }} onClick={loginWithGoogle}>
							<i class="fa fa-google" aria-hidden=""></i>
						</IconButton>
			</div>
			<div>
				<IconButton style={{ backgroundColor: '#4267B2', color: '#fff', width: '45px', height: '45px' }}>
					<FacebookLogin
						appId="574266974631240"
						textButton=''
						fields="name,email,picture"
						callback={loginWithFacebook}
						cssClass="my-facebook-button-class"
						icon="fa fa-facebook"
					/>
				</IconButton>
			</div>
			<div>
				<LinkedIn
					clientId="77jps0wbeeqxux"
					redirectUri={`${window.location.origin}/linkedin`}
					onSuccess={(credentialResponse) => {
						loginWithLinkedin(credentialResponse)
					}}
					onError={(error) => {
						console.log(error);
					}}
					scope="r_emailaddress r_liteprofile w_member_social"
				>
					{({ linkedInLogin }) => (
						<IconButton style={{ backgroundColor: '#0072b1', color: '#fff', width: '45px', height: '45px' }} onClick={linkedInLogin}>
							<i class="fa fa-linkedin" aria-hidden="true"></i>
						</IconButton>
					)}
				</LinkedIn>
			</div>
		</div>
	)
}
class Login extends Component {

	constructor(props) {

		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			loggedIn: false,
			firstLogIn: false,
			values: false,
			forgetPassword: false,
			sendOTP: false,
			enteredOTP: '',
			confirmPassword: '',
			createNewPassword: false,
			loading: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.forgetPassword = this.forgetPassword.bind(this);

	}

	componentDidMount() {
		if (window.token) {
			this.setState({ loggedIn: true });
		}
	}

	handleChange(event) {
		let name = event.target.name;
		let value = event.target.value;
		let data = {};
		data[name] = value;

		this.setState(data);
		document.getElementById('ErrorMessage').innerHTML = "";
	}
	createNewPassword(event) {
		let name = event.target.name;
		let value = event.target.value;
		let data = {};
		data[name] = value;

		this.setState(data);

		if (this.state.password != event.target.value) {
			document.getElementById('ErrorMessage').innerHTML = "Unmatching Passwords !";
		}
		else {
			document.getElementById('ErrorMessage').innerHTML = "";
		}
	}
	render() {
		if (this.state.loggedIn) {
			if (this.state.firstLogIn) {
				return <Redirect to='/questionaire' />
			}
			else {
				return <Redirect to='/dashboard' />
			}
		}

		return (
			<Card className="cardStyle2">
				<Helmet>
					<title>
						Login - Finemate
					</title>
					<meta name='keywords' content="Retention Engine, Revision, Serial Recall, Cognitive Science, Learning, Education, Memorization, Memory, Long-Term Memory, E-Learning, Flashcards, Leitner System, Forget Things, Student Management System, Social Learning Platform, Retention, Revise, Learning Management System, Cognitive Abilities" />
					<meta name="description"
						content="Finemate is a revolutionary tool that helps you understand concepts more deeply, retain knowledge more effectively, and unlock your learning potential."
					/>
				</Helmet>
				<Card.Body>
					<Card.Title className="cardTitleStyle">Welcome Back!</Card.Title>

					{this.state.forgetPassword ?

						this.state.createNewPassword ?
							<form class="flex-column signUpForm" onSubmit={this.forgetPassword}>
								<div>
									<div className='d-flex'>
										<InputLabel htmlFor="outlined-adornment-new-password">Create New Password</InputLabel>
										<Tooltip title="Password must contain a uppercase letter (A-Z), a lowercase letter (a-z), a special characters (@_-), a number (0-9) and should be of minimum 8 characters.">
											<Info style={{ color: '#717175', fontSize: '1em', marginLeft: '0.5em' }} />
										</Tooltip>
									</div>

									<OutlinedInput
										id="outlined-adornment-new-password"
										name='password'
										className='outlinedInput'
										aria-describedby="passwordHelp"
										style={{ height: '40px', width: '300px' }}
										type={this.state.values ? 'text' : 'password'}
										value={this.state.password}
										onChange={this.handleChange}
										required
										inputProps={{ pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,20}$', maxLength: '20' }}
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
								<div>
									<InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
									<OutlinedInput
										id="outlined-adornment-confirm-password"
										name='confirmPassword'
										className='outlinedInput'
										aria-describedby="passwordHelp"
										style={{ height: '40px', width: '300px' }}
										type='password'
										value={this.state.confirmPassword}
										onChange={(e) => this.createNewPassword(e)}
										required
										inputProps={{ pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,20}$', maxLength: '20' }}
									/>
								</div>
								<p id="ErrorMessage"></p>
								<div class="mx-auto text-center p-0 col-md-12 mt-5 text-sm">
									<button className="btnSignUp">
										Create Password
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
							</form>

							:

							<form class="flex-column signUpForm" onSubmit={(e) => { { this.state.sendOTP ? this.otpVerification(e) : this.forgetPassword(e) } }}>
								<div>
									<InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
									<OutlinedInput
										id="outlined-adornment-email"
										name='email'
										className='outlinedInput'
										aria-describedby="emailHelp"
										style={{ height: '40px', width: '300px' }}
										type='text'
										value={this.state.email}
										onChange={this.handleChange}
										required
									/>
								</div>
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
											inputProps={{ maxLength: '6' }}
										/>
									</div>
									:
									null
								}

								<p id="ErrorMessage"></p>
								<div class="mx-auto text-center p-0 col-md-12 mt-5 text-sm">
									<button className="btnSignUp">
										Send
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
							</form>

						:

						<form class="flex-column signUpForm" onSubmit={this.submit}>
							<div>
								<InputLabel htmlFor="outlined-adornment-username">Username/Email</InputLabel>
								<OutlinedInput
									id="outlined-adornment-username"
									name='username'
									className='outlinedInput'
									aria-describedby="usernameHelp"
									style={{ height: '40px', width: '300px' }}
									type='text'
									value={this.state.username}
									onChange={this.handleChange}
									required
								/>
							</div>

							<div>
								<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
								<OutlinedInput
									id="outlined-adornment-password"
									name='password'
									className='outlinedInput'
									aria-describedby="passwordHelp"
									style={{ height: '40px', width: '300px' }}
									type={this.state.values ? 'text' : 'password'}
									value={this.state.password}
									onChange={this.handleChange}
									required
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

							<form class="flex-row" onSubmit={this.submit}>
								<div class="mx-auto text-right p-0 col-md-12 mb-4 text-sm">
									<button style={{ boxShadow: 'none', border: 'none', backgroundColor: 'inherit' }} class="text-dark font-weight-bold" onClick={() => this.setState({ forgetPassword: true })}><u>Forgot Password</u></button>
								</div>
								<p id="ErrorMessage"></p>
								<div class="mx-auto text-center p-0 col-md-12 mb-4 text-sm">
									<button className="btnSignUp">
										LOGIN
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
							</form>

							<div class="mx-auto text-center p-0 text-sm">
								Don't have an account?	<a href="/create" class="ml-1 text-dark font-weight-bold"><u>Sign Up</u></a>
							</div>

							<div className='hr-lines'>
								Or log in with
							</div>

							<LoginWithThirdParties />

						</form>
					}
				</Card.Body>
			</Card>
		)
	}

	otpVerification(e) {
		e.preventDefault();

		this.setState({ loading: true })

		document.getElementById('ErrorMessage').innerHTML = "Wait A Second.";

		if (this.state.enteredOTP == this.state.machineOTP) {
			AxiosBaseFile.post('/api/db_update_user_password', { email: this.state.email, username: this.state.username, password: this.state.password, OTP: this.state.enteredOTP, machineOTP: this.state.machineOTP })
				.then(response => {
					this.setState({ loading: false, createNewPassword: true })
					document.getElementById('ErrorMessage').innerHTML = "";
				})
				.catch(err => {
					this.setState({ loading: false })
					document.getElementById('ErrorMessage').innerHTML = "Unregistered Email";
				})
		}
		else {
			this.setState({ loading: false })
			document.getElementById('ErrorMessage').innerHTML = "Incorrect OTP";
		}
	}
	forgetPassword(e) {
		e.preventDefault();
		this.setState({ loading: true })
		document.getElementById('ErrorMessage').innerHTML = "Wait A Second.";
		AxiosBaseFile.post('/api/db_update_user_password', { email: this.state.email, username: this.state.username, password: this.state.password, OTP: this.state.enteredOTP })
			.then(response => {
				this.setState({ loading: false, sendOTP: !this.state.sendOTP })

				if (this.state.createNewPassword) {
					document.getElementById('ErrorMessage').innerHTML = "New Password created successfully !!";
					setTimeout(() => {
						window.location.reload(true);
					}, 1000)
				} else {
					this.setState({ machineOTP: response.data })
				}

				document.getElementById('ErrorMessage').innerHTML = "";
			})
			.catch(err => {
				this.setState({ loading: false })
				document.getElementById('ErrorMessage').innerHTML = "Unregistered Email";
			})
	}

	submit(e) {
		e.preventDefault();
		this.setState({ loading: true })

		//Check if this is the first login
		AxiosBaseFile.post('/api/db_last_login', { username: this.state.username })
			.then(response => {
				this.setState({ loading: false })

				this.state.firstLogIn = (response.data == "N/A");
				AxiosBaseFile.post('/api/db_login', { username: this.state.username, password: this.state.password })
					.then(response => {
						localStorage.setItem('token', 'true')
						localStorage.setItem('username', response.data.username)
						localStorage.setItem('usertype', response.data.user_type)

						AxiosBaseFile.post('/api/db_get_profile_picture', { username: response.data.username })
							.then(res => {
								localStorage.setItem('profilePicture', res.data.profilePicture)
								localStorage.setItem('name', res.data.name)
								this.setState({ loggedIn: true });
							})
							.catch((error) => {
								console.log(error)
							});
					})
					.catch((error) => {
						document.getElementById('ErrorMessage').innerHTML = "Incorrect Username or Password";
						console.log(error)
					})
			}).catch((error) => {
				this.setState({ loading: false })
				document.getElementById('ErrorMessage').innerHTML = "No user with this username found. Please enter correct username or make a account first.";
				console.log(error)
			});
	}
}

export default Login;