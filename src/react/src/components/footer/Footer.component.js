import React, { useState } from "react";
import { Facebook, Instagram, LinkedIn, Mail, Twitter, WhatsApp, YouTube } from '@material-ui/icons';
import style from './footer.module.css';
import Logo from "../../assets/finemateLatestin Angelina fontLogo.png";
import { Button, TextField } from "@material-ui/core";
import AxiosBaseFile from "../AxiosBaseFile";


const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your code here to send the email to your server for subscription
    AxiosBaseFile.post('/api/newsletter_subscription', {email: email})
    .then(res => setSubscribed(true))
    .catch(err => alert('Their was an error in subscribing newsletter.'))
  };

  return (
    <>
      {subscribed ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className={style.newsletterForm}>
            <h5>Get access to exclusive updates</h5>
            <div className={style.newsletterInputField}>
                <TextField
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={style.newsletterEmailField}
              />
              <button className="btn btn-login">SUBSCRIBE</button>
            </div>
        </form>
      )}
    </>
  );
};


export default function Footer() {

    return (
        <div className={style.footer}>

            <div className="d-flex jusity-content-between flex-wrap">
                <div className="d-flex jusity-content-between flex-wrap">
                    <div>
                        <p>
                            Company
                        </p>


                        <a href='/about'>
                            About
                        </a>


                        <a href='/contact'>
                            Contact
                        </a>

                        <a href='/jobs'>
                            Jobs
                        </a>


                    </div>
                    <div>
                        <p>
                            Learn
                        </p>

                        <a href='/FAQ'>
                            FAQ's
                        </a>

                        <a href='/about#what-is-finemate'>
                            What is Finemate?
                        </a>


                    </div>
                    <div>
                        <p>
                            Terms and Policies
                        </p>

                        <a href='/terms-of-service'>Terms of Service</a>

                        <a href='/privacy-policy'>Privacy Policy</a>


                    </div>
                </div>
                <div className={style.newsletterFormContainer}>
                    <NewsletterForm />
                </div>
            </div>

            <div className={style.footerBottom}>
                <img src={Logo} alt='logo' style={{ width: '150px' }} />
                <p>© 2023 Finemate, Inc. All rights reserved</p>
                <div className={style.socialLinks}>
                    <a href="https://www.instagram.com/finemate.co/"> <Instagram /> </a>
                    <a href="https://twitter.com/Finemate_"> <Twitter /> </a>
                    <a href="https://www.linkedin.com/company/finemate/"> <LinkedIn /> </a>
                    <a href="mailto:contact@finemate.co"> <Mail /> </a>
                </div>
            </div>
        </div>
    )
}