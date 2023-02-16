import React from "react";
import Footer from "./footer/Footer.component";
import OutsideNavbar from "./navbar/outsideNavbar";
import styled from "styled-components";


export default function PageNotFound(){
    return (
        <>
        <OutsideNavbar />
            <Container>
                <img src={require('../assets/pageNotFoundScreen.png')} />
            </Container>
        <Footer />
        </>
        )
}

const Container = styled.div`
  height: 88vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
  height: 86vh;
    img{
        width: 75vw;
    }
  }
`;