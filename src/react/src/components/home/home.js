import React, { Component } from "react";
import styled from "styled-components";
import "./home.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//images
import backgroundHome from "../../assets/backgroundHome.svg";
import macPicture2 from "../../assets/homePageMobileAppShowcase.png";
import RetentionImage from "../../assets/retentionBrainImage.png";
import SocialLearningPlatform from "../../assets/socialLearningImage.png";
import StudentManagementSystem from "../../assets/studentManagementSystemImage.png";
import Testimonials from "./testimonials";


class Home extends Component {
	componentWillUnmount(){
		clearInterval(this.wordChanger)
	}
	render() {
		return (<>

			<Container>
				<Helmet>
					<title>
						Home - Finemate
					</title>
					<meta name='keywords' content="Revision, Serial Recall, Cognitive Science, Learning, Education, Memorization, Memory, Long-Term Memory, E-Learning, Flashcards, Leitner System, Forget Things, Student Management System, Social Learning Platform, Retention, Revise, Learning Management System, Cognitive Abilities" />
				</Helmet>
				<div className="d-flex flex-wrap justify-content-center align-items-center landingPageMainScreen">
					<div className="column homeFinemateIntroduction">
						<h2>Making <span id="word" style={{ color: "var(--purpleDark)", fontWeight: '600' }}>revision</span>effortless</h2>
						<h5>Discover the ultimate solution to forgetting with our amazing platform that brings together a vibrant community of learners for networking and knowledge sharing!
						</h5>
						<br />
						<Link to="/create">
							<button className="btn btn-get-started-white">
								Get started  - it's free!
							</button>
						</Link>
					</div>
					<div className="column">
						<MacPic>
							<img className="macPictureHome" src={macPicture2} alt="" />
						</MacPic>
					</div>
					<svg id="svg2" viewBox="0 0 100 30" version="1.1" preserveAspectRatio="none">
						<path id="path6" d="m-100 1.041s61.625-4.5064 99.75 5.2333 70.594 15.391 124.5 16.312c55.25 0.9437 75.75-8.8513 75.75-8.8513v16.266h-300v-28.959z" style={{ fill: '#fff', fillOpacity: '.2' }} className="layer5"></path>
						<path id="path8" d="m-100 30h300v-6.6791s-16.526 2.7112-62.25 2.3702c-58.5-0.436-97.875-12.245-153.75-15.599-55.875-3.3549-84-0.2745-84-0.2745v20.182z" style={{ fill: '#fff', fillOpacity: '.2' }} className="layer4"></path>
						<path id="path10" d="m200 16.232s-24.625-5.6378-84.5-3.7495c-59.875 1.8882-74.962 15.943-144 16.562-50.75 0.455-71.5-3.7697-71.5-3.7697v4.7252h300v-13.768z" style={{ fill: '#fff', fillOpacity: '.2' }} className="layer3"></path>
						<path id="path12" d="m200 1.041s-61.625-4.5064-99.75 5.2333-70.594 15.391-124.5 16.311c-55.25 0.9437-75.75-8.8513-75.75-8.8513v16.266h300v-28.959z" style={{ fill: '#fff', fillOpacity: '.2' }} className="layer2"></path>
						<path id="path14" d="m-100 17.511s29.006-2.6495 75-0.6876c60.25 2.5701 81.25 11.545 150.25 11.912 55.721 0.2965 74.75-5.6414 74.75-5.6414v6.906h-300v-12.489z" style={{ fill: '#f3f3f3' }} className="layer1"></path>
					</svg>
				</div>

				<Wrapper>
					<p className="instantBreakdown">
						What you can do on finemate?
					</p>
					<div className="introCardsContainer" >
						<div className="introCards">
							<div className="reveal">
								<div className="introImage">
									<img className="introPicture" src={RetentionImage} alt="" />
								</div>
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
								<div className="introImage">
									<img className="introPicture" src={SocialLearningPlatform} alt="" />
								</div>
								<div className="introDescription">
									<h4>
										Learn from Diverse Perspectives
									</h4>
									<p>
										Finemate is a large community of learners which helps you learn & discuss with people having different teaching styles, perspectives, and memory aids — making learning much easier and more engaging.
									</p>
								</div>
							</div>
						</div>
						<div className="introCards">
							<div className="reveal">
								<div className="introImage">
									<img className="introPicture" src={StudentManagementSystem} alt="" />
								</div>
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
					<div className="d-flex justify-content-center mt-5">
						<Link to="/about">
							<button className="btn btn-get-started">
								Learn More About Finemate
							</button>
						</Link>
					</div>
				</Wrapper>
			</Container>
			<p className="instantBreakdown mb-5">
				Here's what users have to say.
			</p>
			<Testimonials />

			{(() => {
				const words = [" discussions ", " learning ", " networking ", " revision "];

				let i = 0;
				this.wordChanger = setInterval(function () {
					document.getElementById("word").innerHTML = words[i];
					i++;
					if (i == words.length) {
						i = 0;
					}
				}, 2000);

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

		</>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  h5{
	color: white;
	font-family: Georgia, 'Times New Roman', Times, serif;
  }
.homeFinemateIntroduction{
	width: 50%;
}

  h2 {
	font-size: 2.5em;
    font-weight: 600;
    color: white;
    font-family: Open Sans;
	}
	h4{
		font-size: 1.25em;
    	font-weight: 700;
    	color: rgba(0, 0, 0, 0.82);
    	font-family: Open Sans;
	}
	@media screen and (max-width: 600px) {
		.homeFinemateIntroduction{
			width: 90%;
			text-align:center;
			margin-top: 5vh;
		}
		h2 {
			font-size: 2em;
		}
	  }
`;

const Wrapper = styled.div`
  width: 100vw;
  margin: 10vh 0;
  background-image: url(${backgroundHome});
  background-size: cover;
  padding: 20vh 8vw 15vh;
  background-repeat: no-repeat;

  	.introCardsContainer{
		width: 100%;
		margin-top: 20vh;
  	}
	.introCards{
		min-height: 70vh;
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
	.introCardsContainer{
		margin-top: 10vh;
	  }
}
`;


const MacPic = styled.div`
display: flex;
justify-content: flex-end;
`;


export default Home;
