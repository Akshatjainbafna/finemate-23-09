import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { Redirect } from 'react-router-dom'
import { CircularProgress, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@material-ui/core';
import { Info, Visibility, VisibilityOff } from '@material-ui/icons';
import AxiosBaseFile from '../AxiosBaseFile';
import { Helmet } from 'react-helmet';


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
								<InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
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

	otpVerification(e) {
		e.preventDefault();
		this.setState({ loading: true })
		console.log(this.state.enteredOTP, this.state.machineOTP, typeof (this.state.machineOTP), typeof (this.state.enteredOTP))
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
						localStorage.setItem('token', response.data)
						localStorage.setItem('username', (this.state.username))

						AxiosBaseFile.post('/api/db_get_user_type', { username: this.state.username })
							.then(response => {
								localStorage.setItem('usertype', response.data)
								this.setState({ loggedIn: true });
							})
							.catch((error) => {
								console.log(error)
							});

						AxiosBaseFile.post('/api/db_get_profile_picture', { username: this.state.username })
							.then(res => {
								localStorage.setItem('profilePicture', res.data.profilePicture)
								localStorage.setItem('name', res.data.name)		
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