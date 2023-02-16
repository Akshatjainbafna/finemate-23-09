import React, { Component } from "react";
import FAQ from "../../components/faq/faq.js";
import "./faqPage.css";
import OutsideNavbar from "../../components/navbar/outsideNavbar.js";

// Bunch of pictures
import Pricing from "../../assets/pricing.PNG";
import greenTick from '../../assets/correctIcon.png';
import styled from "styled-components";
import Footer from "../../components/footer/Footer.component.js";

// End of pictures

// Borrowed code from https://medium.com/javascript-in-plain-english/react-building-an-accessible-faqComponent-bac135116532

class FAQPage extends Component {
  render() {
    return (
      <React.Fragment>
        <OutsideNavbar />
        <Container>

          <div className="pricingScreen">

            <p className="pricingScreenHeading">
              Start your <span style={{color: "var(--purpleDark)"}}>Revision</span> for
            </p>
            <p className="pricingScreenHeading">
              absolutely <span style={{color: "var(--purpleDark)"}}>Free.</span>
            </p>
            <p style={{ marginTop: '2em', fontSize: '16px', fontWeight: '600' }}>
              All we need is Curiosity
            </p>

            <div className="pricingContainer">
              <div>
                <p>Individual</p>
                <p>1-month free trial then 30 posts/month</p>
                <p>
                  <a href="/create" className="btn btn-login">
                    SIGN UP
                  </a>
                </p>
              </div>
              <div>
                <p>
                  Institutes
                </p>
                <p>
                  Pricing based on institute size
                </p>
                <p>
                  <a href='/contact' className="btn btn-login">
                    CONTACT
                  </a>
                </p>
              </div>
            </div>
            <div style={{ marginBottom: '20vh' }}>
              <p style={{ marginBottom: '1em', fontSize: '24pt', fontWeight: '600' }}>
                All Plans Include
              </p>
              <div className="features">

                <p><img src={greenTick} /> Get personalized posts</p>

                <p><img src={greenTick} /> Track your progress</p>

                <p><img src={greenTick} /> Discuss topics with a large community of learners</p>

                <p><img src={greenTick} /> Create Graphical To-Do's</p>

                <p><img src={greenTick} /> Connect with like minded learners</p>

                <p><img src={greenTick} /> Get 12+ types of quizzes</p>

              </div>
            </div>
          </div>
          <h3 className="faq-header">Frequently Asked Questions</h3>
          <div className="FAQBox">
            <FAQ>
              <FAQ.QAItem>
                <FAQ.Question answerId="q1">
                  {(isOpen, onToggle) => {
                    return (
                      <>
                        <b>
                          Why to use Finemate?
                        </b>
                        {isOpen ? " ▲" : " ▼"}
                      </>
                    );
                  }}
                </FAQ.Question>
                <FAQ.Answer id="q1">
                  To retain knowledge even after years of learning it.{" "}
                </FAQ.Answer>
              </FAQ.QAItem>
              <FAQ.QAItem>
                <FAQ.Question answerId="q2">
                  {(isOpen, onToggle) => {
                    return (
                      <>
                        <b>Do you have an android app?</b>
                        {isOpen ? " ▲" : " ▼"}
                      </>
                    );
                  }}
                </FAQ.Question>
                <FAQ.Answer id="q2">
                  {" "}
                  Not now, but we are building it{" "}
                </FAQ.Answer>
              </FAQ.QAItem>
              <FAQ.QAItem>
                <FAQ.Question answerId="q3">
                  {(isOpen, onToggle) => {
                    return (
                      <>
                        <b>If I am a student, do I have to choose Normal or Student in Sign Up form?</b>
                        {isOpen ? " ▲" : " ▼"}
                      </>
                    );
                  }}
                </FAQ.Question>
                <FAQ.Answer id="q3">
                  {" "}
                  If you are an student of our partner institutes and your institution has given you an unique identity number,
                   you would've to select Student,
                   otherwise you would have to select Normal.{" "}
                </FAQ.Answer>
              </FAQ.QAItem>
              <FAQ.QAItem>
                <FAQ.Question answerId="q4">
                  {(isOpen, onToggle) => {
                    return (
                      <>
                        <b>Can I change the posts after creating it?</b>
                        {isOpen ? " ▲" : " ▼"}
                      </>
                    );
                  }}
                </FAQ.Question>
                <FAQ.Answer id="q4">
                  {" "}
                  No. To maintain the integrity and reliability of information we don't allow changes once the post is created.{" "}
                </FAQ.Answer>
              </FAQ.QAItem>
              {/*
              <FAQ.QAItem>
                <FAQ.Question answerId="q5">
                  {(isOpen, onToggle) => {
                    return (
                      <>
                        <b>What is your refund policy?</b>
                        {isOpen ? " ▲" : " ▼"}
                      </>
                    );
                  }}
                </FAQ.Question>
                <FAQ.Answer id="q5">
                  {" "}
                  U-Impactify does not offer refunds except in certain
                  situations and jurisdictions, as noted in our refund policy.{" "}
                </FAQ.Answer>
              </FAQ.QAItem>
              <FAQ.QAItem>
                <FAQ.Question answerId="q6">
                  {(isOpen, onToggle) => {
                    return (
                      <>
                        <b>Can I expense my membership?</b>
                        {isOpen ? " ▲" : " ▼"}
                      </>
                    );
                  }}
                </FAQ.Question>
                <FAQ.Answer id="q6">
                  {" "}
                  Many employers find U-Impactify so valuable that they'll pay
                  for their employees' subscriptions. At the end of your
                  purchase, you'll receive the receipt in your email that you
                  can use to file an expense report.{" "}
                </FAQ.Answer>
              </FAQ.QAItem>
              */}
            </FAQ>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  background: #fcfcfb;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10rem;
  text-align: center;
  color: #000;
`;

export default FAQPage;
