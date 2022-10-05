import React from "react";
import { Facebook, Instagram, LinkedIn, Mail, Twitter, WhatsApp} from '@material-ui/icons';
import style from './footer.module.css';

export default function Footer(){

    return(
        <div className={style.footer}>
            <div>© 2022 Finemate India, Inc. All rights reserved</div>
            <div className={style.socialLinks}>
                <a href ="https://www.linkedin.com/in/akshat-jain-571435139/"> <LinkedIn /> </a>
                <a href ="https://twitter.com/akshatjainbafna"> <Twitter /> </a>
                <a href ="https://api.whatsapp.com/send?phone=9425919685&text=Hey,%20there!%20I%20just%20saw%20Finemate%20"> <WhatsApp /> </a>
                <a href ="mailto:akshatbjain.aj@gmail.com? subject= Regarding Finemate"> <Mail /> </a>
            </div>
            <p className={style.License}> Hey! Guys I am definitely gonna pay whoever's licensable Images I have used so please be kind for now.  </p>
        </div>
    )
}