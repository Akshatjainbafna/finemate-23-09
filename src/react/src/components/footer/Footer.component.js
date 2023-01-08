import React from "react";
import { Facebook, Instagram, LinkedIn, Mail, Twitter, WhatsApp, YouTube} from '@material-ui/icons';
import style from './footer.module.css';

export default function Footer(){

    return(
        <div className={style.footer}>
            <div>© 2023 Finemate, Inc. All rights reserved</div>
            <div className={style.socialLinks}>
                <a href ="https://www.instagram.com/finemate_official/"> <Instagram /> </a>
                <a href ="https://twitter.com/Finemate_"> <Twitter /> </a>
                <a href ="https://youtu.be/2tPOe44aJ0M"> <YouTube /> </a>
                <a href ="mailto:contact@finemate.co"> <Mail /> </a>
            </div>
        </div>
    )
}