import React, { Component } from "react";
import styled from "styled-components";
import "./home.css";
import { Link } from "react-router-dom";

//images
import backgroundHome from "../../assets/backgroundHome.svg";
import macPicture2 from "../../assets/homePage3DesktopFinemate.png";
import RetentionImage from "../../assets/retentionBrainImage.png";
import SocialLearningPlatform from "../../assets/socialLearningImage.png";
import StudentManagementSystem from "../../assets/studentManagementSystemImage.png";
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


class Home extends Component {
  render() {
    return (
      	<Container>
			<div class="d-flex flex-wrap">
					<div class="column">
						<br/>
						<br/>
						<br/>
						<h6> What is Finemate?</h6>
						<h3> A Software-as-a-service packed with<br/>Retention Engine,<br/>Social Learning Platform,<br/> &amp; Student Management System.</h3>
						<br/>
						<td>
							<Link to="/create">
							<button className="btn btn-get-started">  GET STARTED  </button>
							</Link>
						</td>
						<td className="spacing">
							<br/>
						</td>
						<td>
							<h6> Request an instant demo </h6>
						</td>
					</div>
					
					<div class="column">
						<MacPic>
							<img className="macPictureHome" src={macPicture2} alt="" />
						</MacPic>
					</div>
			</div>
			<br/>
			<br/>
			<br />

			<h2 className="instantBreakdown">Instant &#x1F5F2; Breakdown</h2>
			<br/>
			<br/>
			
			<Wrapper>
			<div className="introCards">
				<div className="introImage"> <img className="introPicture" src={RetentionImage} alt="" /> </div>
				<div className="introDescription">
					<h4>
					Retention Engine
					</h4>
					<p>
					Retention Engine is a software system that helps you to retain whatever you learn from different sources on a daily basis. It helps you to avoid confusion and better cognition.
					</p></div>
			</div>
			<div className="introCards">
				<div className="introImage"> <img className="introPicture" src={SocialLearningPlatform} alt="" /> </div>
				<div className="introDescription"><h4>
					Social Learning Platform
					</h4>
					<p>
					Learn from people of different domains, expertise, experience, age group, origin. Helping you to understand things with different teaching methodaology, anamolies, percepectives, and Mnemonic Devices. And connect with like minded people and students across classroom boundary.
					</p></div>
			</div>
			<div className="introCards">
				<div className="introImage"> <img className="introPicture" src={StudentManagementSystem} alt="" /> </div>
				<div className="introDescription"><h4>
					Student Management System
					</h4>
					<p>
					A super app through which you can submit fees, check result, check attendance, get quick updates from institue, submit assignments in an organised manner, manage notes, instantly chat with friends and faculties and many more features that serves all the web requirements of an Institute with a student friendly user interface.
					</p></div>
			</div>
			</Wrapper>

			<br/>
			<Link to="/about">
            	<button className="btn btn-get-started">Learn More About What Finemate Does</button>
          	</Link>
		  	<br/>
			<br/>
			<br />

			<Content>
				<h2 className="whyHeader">Why You Need Finemate?</h2>
				<div className="whyContainer">
					<div className="whyRetention">
						<div className="textWhy">As Students and professionals forgets things as soon as they have learnt so to Retain knowledge meanwhile Enchansing Cognition and dealing with Confusion.</div>
					</div>
					<div className="whySocialLearning">
						<div className="textWhy">As it's said one should learn from as many people as possible to learn new things and also current social media platforms aren't socializing enough.</div>
					</div>
					<div className="whyStudentManagement">
						<div className="textWhy">As most of the institutes don't have a Student management system even in 2022 and those who have are outdated products with very little features and bad user experience.</div>
					</div>
				</div>
			</Content>
			<br />
			<br />
			<br />

			<h2 className="whyHeader">What's For?</h2>
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
			
			<Content>
				<h2 className="whyHeader2">Where can you access Finemate?</h2>
				<p>Finemate, On every Device</p>
				<img src={AllDeviceSizes} className='allDeviceImage' />
				<p className="mt-5">So you can use it...</p>
				<div className="whyContainer" >
					<div className="deviceCompatibleContainer">
						<img src={FinemateOnDesktop} />
					</div>
					<div className="deviceCompatibleContainer">
						<img src={FinemateOnTablet} />
					</div>
					<div className="deviceCompatibleContainer">
						<img src={FinemateOnMobile} />
					</div>
				</div>
			</Content>
			<br />
				<br />
				<br />
				<br />
			<h2 className="whyHeader">A Quick Recape!</h2>
			<br />
			<div className="homepageMemeContainer"><img src={FinemateMemeRepresentation} alt="FinemateMemeRepresentation" /></div>
			<br />
			<br />
			<br />
						<div class="row">
							<div class="column">
								<td>
									<Link to="/create">
									<button className="btn btn-get-started">  GET STARTED  </button>
									</Link>
								</td>
								<td className="spacing">
									<br/>
								</td>
								<td>
									<h6>Request an instant demo</h6>
								</td>
							</div>
						</div>
						<br/>
						<br/>
      </Container>
    );
  }
}

const TestimonialSection = styled.div`
	
	align: center;
`;

const Container = styled.div`
  background: #fcfcfb;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 2em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
	}
	.spacing {
		width: 3rem;
	}
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-image: url(${backgroundHome});
  background-position: center;
  background-size: cover;
	background-repeat: no-repeat;
	.instantBreakdown{
		color: #ff0000;
		font: bold 1.8em 'Bangers', cursive;
	}
	.introCards{
		margin: 2vh 1vw;
		display: block;
		width: 30%;
		align-items: center;
		text-align-center;
	}
	.introImage{
		margin-bottom: 2vh;
	}
	.introDescription, .introImage{
		text-align: center;
		align-items: center
	}
	@media screen and (max-width: 600px) {
		.introCards {
		  width: 100%;
		}
	  }
`;


const MacPic = styled.div`
  .macPictureHome {
    height: 25rem;
    margin-top: 0rem;
    margin-bottom: 4rem;
  }
`;

const Content = styled.div`
height: 100%;
  width: 100%;
  align-items: center;
  text-align: center;
  .whyContainer{
	display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  }
  .whyHeader{
	font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    font-size: 2em;
    margin-bottom: 4rem;
	text-align: center;
  }
  .whyHeader2{
	font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    font-size: 2em;
	text-align: center;
  }
  .title1 {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    font-size: 32px;
    margin-bottom: 4rem;
  }
  p {
    font-weight: normal;
    color: #3e4345;
    font-family: Open Sans;
    font-size: 22px;
  }
  .title2 {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
    font-size: 32px;
    margin-top: 9rem;
    margin-bottom: 4rem;
	}
	.spacing {
		width: 3rem;
	}
`;

const Board =  styled.div`
width: 100%;
height: 100%;
`;


export default Home;
