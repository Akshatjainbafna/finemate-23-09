import React, { Component } from "react";
import styled from "styled-components";
import backgroundAbout from "../../assets/backgroundAbout.svg";
import macPicture from "../../assets/desktopFinemate.png";
import social from "../../assets/teacherInClassSittingDown.svg";
import instructor from "../../assets/teacherInClassStandingUp.svg";
import WhiteBoardPainPoints from '../../assets/whiteBoardPainPoints.png';
import createMessage from '../../assets/createMessage.png';
import "./about.css";
import AxiosBaseFile from "../AxiosBaseFile";

class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      addedPainPoint: ""
    }
  }
  addPainPointToDatabase(event){
    event.preventDefault();
    AxiosBaseFile.post("/api/add_pain_point_to_database", {'painPoint' : this.state.addedPainPoint}).catch(err => console.log(err));
  }

  render() {
    return (
      <ContainerAbout>
        <h3> About Finemate </h3>
        <Wrapper>
            <img className="macPicture" src={macPicture} alt="" />
          <Content>
            <h3 className="title1">What is Finemate?</h3>
            <p className="introFinemate">
            Finemate is a Mobile-friendly SaaS platform with services of a Learning management system, Social learning platform, Student management system, Content authoring tools, Access control system, Library management system, MarketPlace for students, etc and a <b>Retention Engine</b> on top of this. Retention Engine is Software System that will help you in cognition and long-term retention of anything and everything that you learn from various different sources online and offline. It helps you to deal with confusion and helps you in better cognition.
            </p>

            <h3 className="aimHeading">What are we aiming for?</h3>
            <div className="aimContainer">
              <div className="aimSocial">
                <img className="social" src={social} alt="" />
                <h4> Students </h4>
                <p>
                  • Helps students to learn better
                  <br />
                  and retain better.
                  <br /> 
                   • Builds a learning community to
                  share <br />
                  expertise and experience.
                </p>
              </div>
              <div className="aimInstitute">
                <img className="instructor" src={instructor} alt="" />
                <h4>Institutes</h4>
                <p>
                  • Improving the students performance 
                  <br />
                  eventually benefiting Institutes.
                  <br /> 
                  • Providing a Technically Advance
                  <br />
                  Student Management System.
                </p>
              </div>
            </div>
          <div className="painPoints">
          <h3 className="title1">Few of the Pain Points that finemate is solving...</h3>
          
          <div className="blackBoardContainer">
            <img src={WhiteBoardPainPoints} alt="" />
            <p className="addedPainPoint">{this.state.addedPainPoint ? this.state.addedPainPoint : ""}</p>
          </div>
          <br />
          <div class="addPainPoint">
            <div>As a Student, Professional or Inute if you face any problem please</div>
            <div className="d-flex">
              <input type="text" class="form-control" id="inlineFormPainPointInput" onChange={(e) => {this.setState({addedPainPoint: e.target.value})}} placeholder="Add one..." maxLength="25" />
              <button type="submit" className="border-0 bg-light"  onClick={(e)=> this.addPainPointToDatabase(e)}>
                <img src={createMessage} alt="" />
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
          </Content>
        </Wrapper>
      </ContainerAbout>
    );
  }
}

const ContainerAbout = styled.div`
  background: #fcfcfb;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 5vw 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 3.5em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
  .introFinemate{
    width: 80%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundAbout});
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
`;


const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title1 {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    font-size: 2em;
    margin-top: 8rem;
    margin-bottom: 4rem;
  }
  p {
    font-weight: normal;
    color: #3e4345;
    font-family: Open Sans;
    font-size: 22px;
  }
  .aimHeading{
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    font-size: 2em;
    margin: 8rem 5vw 4rem;
  }
`;


export default About;
