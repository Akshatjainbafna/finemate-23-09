import React, { useEffect, useState } from "react"
import OutsideNavbar from "../../components/navbar/outsideNavbar"
import Typed from "react-typed";
import { Tooltip } from "@material-ui/core";
import Footer from "../../components/footer/Footer.component";
import LoadingGif from "../../components/loadingGif";
import { Helmet } from "react-helmet";
import './contact.css';
import contactFormImg from '../../assets/undraw-contact.svg'
import AxiosBaseFile from "../../components/AxiosBaseFile";

export default function ContactPage() {
    const [loading, setLoading] = useState(true);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    })
    function contactFormSubmit(e){
        e.preventDefault();
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data)
        AxiosBaseFile.post('/api/contact_form', data)
        .then(res => setSent(true))
        .catch(err => alert("Your message can't be submitted, try again."))
    }
    if (loading) {
        return <div className="loadingGif">
            <LoadingGif />
        </div>
    }
    return <>
        <Helmet>
            <title>
                Contact - Finemate
            </title>
            <meta name='keywords' content="Hiring, Jobs, Student Management System" />
            <meta name='description' content="We believe in building that every great product is build by a great team who is equally motivated and eager to bring the dreams to reality, to make lives easy and jolly of people. If you think the same we have a good news for you, We are Hiring." />
        </Helmet>
        <OutsideNavbar />
        <div class="content m-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-10">
                        <div class="row justify-content-center">
                            <div class="col-md-6">
                                <h3 class="heading mb-4">We welcome your questions and ideas!</h3>
                                <p>Get in touch at contact@finemate.co</p>
                                <p><img src={contactFormImg} alt="Image" class="img-fluid" /></p>
                            </div>
                            <div class="col-md-6">
                                {sent ?
                                    <div id="form-message-warning mt-4">
                                        <div id="form-message-success">
                                            Your message was sent, thank you!
                                        </div>
                                    </div>
                                    :
                                    <form onSubmit={contactFormSubmit} class="mb-5" id="contactForm" name="contactForm">
                                        <div class="row">
                                            <div class="col-md-12 form-group">
                                                <input type="text" class="form-control" name="name" id="name" placeholder="Your name" required />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 form-group">
                                                <input type="email" class="form-control" name="email" id="email" placeholder="Email" required />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 form-group">
                                                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 form-group">
                                                <textarea class="form-control" name="message" id="message" cols="30" rows="7" placeholder="Write your message" required></textarea>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <input type="submit" value="Send Message" class="btn btn-login py-2 px-4" />
                                                <span class="submitting"></span>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
}