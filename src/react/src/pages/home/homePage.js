import React, { Component } from "react";
import Home from "../../components/home/home.js";
import styled from "styled-components";
import OutsideNavbar from "../../components/navbar/outsideNavbar.js";
import Footer from "../../components/footer/Footer.component.js";
import LoadingGif from "../../components/loadingGif.js";

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }
  
  componentDidMount(){
    setTimeout(() => {
    this.setState({loading: false})
    }, 2000);
  }
  render() {
    if (this.state.loading){
      return  <div className="loadingGif">
                <LoadingGif />
              </div>
    }
    return (
      <Container>
        <OutsideNavbar />
        <Home />
        <Footer />
      </Container>
    );
  }
}

const Container = styled.div`
  background: #fcfcfb;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export default HomePage;
