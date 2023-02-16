import React from "react";
import Footer from "../../components/footer/Footer.component";
import OutsideNavbar from "../../components/navbar/outsideNavbar";

export default function JobsPage(){
    return <>
    <OutsideNavbar />
    <div className="d-flex justify-content-center align-items-center" style={{height: '88vh', width: '60vw', margin: 'auto'}}>
        <div>
        <h2>
            We are looking for Tech Co-founder who aligns with out beliefs.
        </h2>
        <h4>
            If you think you are suitable as well as capable for the role, kindly <a href="mailto:contact@finemate.co">email</a> us your resume or connect through <a href='/contact#contactForm'>contact form.</a>
            <br />
            We don't care about what you have achieved so far but we do care what impact you want to create.
        </h4>
        </div>
    </div>
    <Footer />
    </>
}