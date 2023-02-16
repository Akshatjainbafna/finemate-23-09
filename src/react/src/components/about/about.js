import React, { Component } from "react";
import styled from "styled-components";
import backgroundAbout from "../../assets/backgroundAbout.svg";
import macPicture from "../../assets/desktopFinemate.png";
import social from "../../assets/teacherInClassSittingDown.svg";
import instructor from "../../assets/teacherInClassStandingUp.svg";
import WhiteBoardPainPoints from '../../assets/whiteBoardPainPoints.png';
import createMessage from '../../assets/createMessage.png';
import WhatsForStudents from "../../assets/Whats for Students.png";
import WhatsForInstitutes from "../../assets/Whats for Institutes.png";
import WhatsForProfessionals from "../../assets/Whats for Professionals.png";
import WhatsForCanteenOwners from "../../assets/Whats for Canteen Owners.png";
import WhatsForInvestors from "../../assets/Whats for Investors.png";
import FinemateMemeRepresentation from "../../assets/Finemate Meme representation.png";
import AllDeviceSizes from '../../assets/allDeviceSizes2.png';
import FinemateOnDesktop from '../../assets/finemateScreenForDesktop.png';
import FinemateOnTablet from '../../assets/finemateScreenForTablet.png';
import FinemateOnMobile from '../../assets/finemateScreenForMobile.png';
import "./about.css";
import AxiosBaseFile from "../AxiosBaseFile";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      addedPainPoint: ""
    }
  }
  addPainPointToDatabase(event){
    event.preventDefault();
    AxiosBaseFile.post("/api/add_pain_point_to_database", {'painPoint' : this.state.addedPainPoint})
    .then(res => {
      this.setState({addedPainPoint: ""})
      alert('We understand your problem and we will work on it.')
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <ContainerAbout>
        <Helmet>
				<title>
					About - Finemate
				</title>
				<meta name='keywords' content="Retention Engine, Revision, Serial Recall, Cognitive Science, Learning, Education, Memorization, Memory, Long-Term Memory, E-Learning, Flashcards, Leitner System, Forget Things, Student Management System, Social Learning Platform, Retention, Revise, Learning Management System, Cognitive Abilities" />
        <meta name='description' content="Finemate is a software platform that offers a range of software services to help students and professionals retain knowledge and improve their cognitive abilities. It includes a Retention Engine that employs techniques such as the Leitner system, visual elements, paraphrasing, scaffolding, and personalized content to help users retain knowledge in the long term, reduce confusion, and better understand concepts. In addition, Finemate also offers student and employee management systems, and it includes gamification elements such as quizzes to help users engage with the platform. It is designed to provide a comprehensive solution for institutes, addressing all of their students' and employees' requirements.'"/>
			</Helmet>
        <h3> About Finemate </h3>
        <Wrapper>
            <img className="macPicture" src={macPicture} alt="" />
          <Content>
            <h3 className="title1" id='what-is-finemate'>What is Finemate?</h3>
            <p className="introFinemate">
            Finemate is a software platform that offers a range of software services to help students and professionals retain knowledge and improve their cognitive abilities. It includes a Retention Engine that employs techniques such as the Leitner system, visual elements, paraphrasing, scaffolding, and personalized content to help users retain knowledge in the long term, reduce confusion, and better understand concepts. In addition, Finemate also offers student and employee management systems, and it includes gamification elements such as quizzes to help users engage with the platform. It is designed to provide a comprehensive solution for institutes, addressing all of their students' and employees' requirements.
            </p>
            {/*
            Other Option: Finemate is a software platform that aims to improve long-term memory in students and professionals. It combines a learning management system, social learning platform, student management system, and marketplace for students with a retention engine that employs techniques such as the Leitner system, photographic elements, paraphrasing, scaffolding, and personalized content to help users retain knowledge and better understand concepts.
            Other Option: Finemate is a comprehensive software-as-a-service platform that addresses the issue of poor long-term memory in students and professionals. It combines the features of a learning management system, a social learning platform, a student management system, and a marketplace for students, among other services. On top of these features, Finemate also includes a retention engine that helps users retain knowledge over the long term, reduce confusion, and better understand concepts by using techniques like the Leitner system, visual elements like pictures and diagrams, paraphrasing, scaffolding, gamification, quizzes and personalized content based on the user's forgetting curve.
            Other Option: Finemate is a Software-as-a-service that aims to address the issue of poor long-term memory in students and professionals. It combines a learning management system, social learning platform, student management system, and marketplace for students with a retention engine that employs techniques such as the Leitner system, photographic elements, paraphrasing, scaffolding, gamification quizzes and personalized content to help users retain knowledge and better understand concepts.
            Other Option: Finemate is a SAAS (Software-as-a-service) platform that is designed to help students and employees retain knowledge and improve their cognitive abilities. It offers a range of services, including a social learning platform, student and employee management systems, and gamification elements that help users connect knowledge with dopamine. Finemate aims to provide a comprehensive solution for institutes, addressing all of their students' and employees' requirements and helping them retain knowledge in the long term.
            Other Option: Finemate is a software platform that is designed to help students and professionals retain knowledge and improve their cognitive abilities. It aims to provide a comprehensive solution for institutes, addressing all of their students' and employees' requirements. In addition, Finemate also includes a Retention Engine that helps users retain knowledge in the long term, reduce confusion, and better understand concepts. The Retention Engine employs various techniques, such as the Leitner system, visual elements, paraphrasing, scaffolding, gamification quizzes and personalized content based on the user's forgetting curve.
            Other Option: Finemate is a software platform that offers a range of services designed to help students and professionals retain knowledge and improve their cognitive abilities. It aims to provide a comprehensive solution for institutes, addressing all of their students' and employees' requirements. In addition to its core features, Finemate also includes a Retention Engine that helps users retain knowledge in the long term, reduce confusion, and better understand concepts. The Retention Engine employs various techniques, such as the Leitner system, visual elements, paraphrasing, scaffolding, gamification quizzes, and personalized content based on the user's forgetting curve.
            */}
            <h3 className="title1">What are we aiming for?</h3>
            <div className="aimContainer">
              <div className="aimSocial">
                <img className="social" src={social} alt="" />
                <h4> Students </h4>
                <ul>
                  <li>
                    Help students to learn better and retain better.
                  </li>
                  <li>
                    Builds a community of learners to share expertise and experience.
                  </li>
                </ul>
              </div>
              <div className="aimInstitute">
                <img className="instructor" src={instructor} alt="" />
                <h4>Institutes</h4>
                <ul>
                  <li>
                    Providing an Advance Student Management System.
                  </li>
                  <li>
                    Improving the students performance benefits Institutes.
                  </li>
                </ul>
              </div>
            </div>
            <Content>
				<h2 className="title1">Why You Need Finemate?</h2>
				<div className="whyContainer">
					<div className="whyRetention">
						<div className="textWhy">To mitigate forgetting & incomplete cognition</div>
					</div>
					<div className="whySocialLearning">
						<div className="textWhy">To connect with learners who share different perspectives, thus learning better.</div>
					</div>
					<div className="whyStudentManagement">
						<div className="textWhy">To get an advance student management system so you don't have to use multiple apps for different purposes.</div>
					</div>
				</div>
			</Content>

			{/*
			<h2 className="">What's For?</h2>
			<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  				<ol class="carousel-indicators">
    				<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    				<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    				<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    				<li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
    				<li data-target="#carouselExampleIndicators" data-slide-to="4"></li>

  				</ol>
  				
				<div class="carousel-inner">
    				<div class="carousel-item active">
      					<img class="d-block w-100" src={WhatsForStudents} alt="WhatsForStudents"/>
    				</div>
    				<div class="carousel-item">
      					<img class="d-block w-100" src={WhatsForInstitutes} alt="WhatsForInstitutes"/>
    				</div>
    				<div class="carousel-item">
      					<img class="d-block w-100" src={WhatsForProfessionals} alt="WhatsForProfessionals"/>
    				</div>
					<div class="carousel-item">
      					<img class="d-block w-100" src={WhatsForCanteenOwners} alt="WhatsForCanteenOwners"/>
    				</div>
					<div class="carousel-item">
      					<img class="d-block w-100" src={WhatsForInvestors} alt="WhatsForInvestors"/>
    				</div>
  				</div>
  				
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    				<span class="sr-only">Previous</span>
  				</a>
  				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    				<span class="carousel-control-next-icon" aria-hidden="true"></span>
    				<span class="sr-only">Next</span>
  				</a>
			</div>
			<br />
			<br />
			<br />
	*/}
			
			<Content>
				<h2 className="title1">Where can you access Finemate?</h2>
				<p>Finemate, On every Device</p>
				<img src={AllDeviceSizes} className='allDeviceImage' />
				<p className="mt-5">So you can use it...</p>
				<div className="deviceCompatibleContainer">
					<img src={FinemateOnDesktop} />
				</div>
				<div className="deviceCompatibleContainer blueBg">
					<img src={FinemateOnTablet} />
				</div>
				<div className="deviceCompatibleContainer">
					<img src={FinemateOnMobile} />
				</div>
			</Content>
			<h2 className="title1 mt-0">A Quick Recape!</h2>
			<br />
			<div className="homepageMemeContainer"><img src={FinemateMemeRepresentation} alt="FinemateMemeRepresentation" /></div>
			<br />
			<br />
			<br />
						<div class="row">
							<div class="column">
								<td>
									<Link to="/create">
										<button className="btn btn-get-started">  Get started  - it's free! </button>
									</Link>
								</td>
							</div>
						</div>
						<br/>
						<br/>

          <div className="painPoints">
          <h3 className="title1">Few of the Pain Points that finemate is solving...</h3>
          
          <div className="blackBoardContainer">
            <img src={WhiteBoardPainPoints} alt="" />
            <p className="addedPainPoint">{this.state.addedPainPoint ? this.state.addedPainPoint : ""}</p>
          </div>
          <br />
          <div class="addPainPoint">
            <div>As a Student, Professional or Institute if you face any problem please</div>
            <div className="d-flex addPainPointForm">
              <input type="text" class="form-control" id="inlineFormPainPointInput" value={this.state.addedPainPoint}  onChange={(e) => {this.setState({addedPainPoint: e.target.value})}} placeholder="Add one..." maxLength="25" />
              <button type="submit" className="border-0 bg-light" onClick={(e)=> this.addPainPointToDatabase(e)}>
                <img src={createMessage} alt="" />
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
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
    font-size: 2.5em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundAbout});
  background-size: cover;
  background-repeat: no-repeat;
`;


const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .whyContainer{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 90vw;
    }
  .title1 {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 2em;
    margin: 8rem 1rem 4rem;
    text-align: center;
  }
  ul{
    margin: auto 2vw;
  }
  li {
    font-weight: normal;
    color: #3e4345;
    font-family: Open Sans;
    font-size: 20px;
  }
  @media screen and (max-width: 600px) {
    ul{
      margin: auto;
    }
    li{
      font-size: 16px;
    }
    .title1 {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.82);
      font-family: Open Sans;
      font-size: 1.5em;
      margin: 8rem 1rem 4rem;
      text-align: center;
    }
  }
`;


export default About;
