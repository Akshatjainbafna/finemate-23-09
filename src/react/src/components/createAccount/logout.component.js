import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect: false
    }
  }
    componentDidMount(){
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    redirect(){
      this.setState({redirect: true})
    }
 
  render() {
    if (this.state.redirect){
      return <Redirect to='/login' />
    }

    return (
          <div className="logOutScreen">
            <p>You are logged out! Visit Soon.</p>
            <Button style={{borderColor: 'var(--purpleMain)',	borderRadius: '10px',	width: '10rem', color: '#FCFCFB', fontFamily: "Open Sans", backgroundColor: 'var(--purpleMain)'}} onClick={()=> this.redirect()}> Login </Button>
          </div>
    );
  }

  
}

export default Logout;