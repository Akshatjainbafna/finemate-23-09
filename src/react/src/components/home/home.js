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


class Home extends Component {
  render() {
    return (
      	<Container>
			<div class="d-flex flex-wrap justify-content-center">
					<div class="column homeFinemateIntroduction">
						<br/>
						<br/>
						<br/>
						<h6>Unlock Your Learning Potential with Finemate</h6>
						<h3>Finemate is a revolutionary tool that helps you understand concepts more deeply, retain knowledge more effectively, and unlock your learning potential.</h3>
						<br/>
						<td>
							<Link to="/create">
							<button className="btn btn-get-started">  Get started  - it's free! </button>
							</Link>
						</td>
					</div>
					
					<div class="column homeFinemateIntroduction">
						<MacPic>
							<img className="macPictureHome" src={macPicture2} alt="" />
						</MacPic>
					</div>
			</div>


{(()=> {
	function reveal() {
		var reveals = document.querySelectorAll(".reveal");
	  
		for (var i = 0; i < reveals.length; i++) {
		  var windowHeight = window.innerHeight;
		  var elementTop = reveals[i].getBoundingClientRect().top;
		  var elementVisible = 150;
	  
		  if (elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add("active");
		  } else {
			reveals[i].classList.remove("active");
		  }
		}
	  }
	  
	  window.addEventListener("scroll", reveal);
})()}

			<Wrapper>
			<p className="instantBreakdown">Instant &#x1F5F2; Breakdown</p>
			<div style={{width: '100%', marginTop: '15vh'}} >
			<div className="introCards">
				<div className="reveal">
				<div className="introImage"> <img className="introPicture" src={RetentionImage} alt="" /> </div>
				<div className="introDescription">
					<h4>
					Unlock Your Retention Power
					</h4>
					<p>
					Our Retention Engine provides an innovative way to understand concepts more deeply and retain knowledge more effectively - so you can avoid confusion and unlock your true learning potential.
					</p>
				</div>
				</div>
			</div>
			<div className="introCards">
			<div className="reveal">
			<div className="introImage"> <img className="introPicture" src={SocialLearningPlatform} alt="" /> </div>
				<div className="introDescription">
					<h4>
						Learn from Diverse Perspectives
					</h4>
					<p>
						Finemate helps you learn from people with different teaching styles, perspectives, and memory aids — making learning much easier and more engaging.	
					</p>
				</div>
					</div>
				
			</div>
			<div className="introCards">
			<div className="reveal">
			<div className="introImage"> <img className="introPicture" src={StudentManagementSystem} alt="" /> </div>
				<div className="introDescription">
					<h4>
						Manage Students Effortlessly
					</h4>
					<p>
						Our Student Management System allows teachers to monitor their students' progress, giving them the power to customize their lessons accordingly. With this system, teachers can ensure that each student gets the individual attention they need to excel in their studies.
					</p>
				</div>
					</div>
			</div>
			</div>
			<div className="d-flex justify-content-center">
			<Link to="/about">
            	<button className="btn btn-get-started">Learn More About Finemate</button>
          	</Link>
			</div>
			</Wrapper>
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
  h6{
	font-family: Georgia, 'Times New Roman', Times, serif;
  }
.homeFinemateIntroduction{
	width: 40%;
}
  h3 {
    font-size: 1.75em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
	}
	@media screen and (max-width: 600px) {
		.homeFinemateIntroduction{
			width: 100%;
		}
	  }
`;

const Wrapper = styled.div`
  width: 100vw;
  margin: 12vh 0;
  background-image: url(${backgroundHome});
  background-size: cover;
  padding: 15vh 8vw 0;
  background-repeat: no-repeat;
  	.instantBreakdown{
		color: #ff0000;
		font: bold 1.8em 'Bangers', cursive;
	}
	.introCards{
		min-height: 75vh;
	}
	.introCards div{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 40vw;
		tex-align: center;
	}
	.introCards:nth-child(2){
		margin-left: 50%;
	}.introCards:nth-child(3){
		margin-bottom: 0;
	}
	.introPicture{
		width: 15vw;
		margin-bottom: 2vh;
	}
	.introDescription{
		text-align:center;
	}
	@media screen and (max-width: 600px) {	
		.introPicture{
			width: 50vw;	
		}
		.introCards div{
			width: 100%;
		}
		.introCards:nth-child(2){
			margin-left: 0;
		}
	  }
`;


const MacPic = styled.div`
display: flex;
justify-content: center;
  @media screen and (max-width: 600px) {
	margin-top: 5vh;
  }
`;


export default Home;
