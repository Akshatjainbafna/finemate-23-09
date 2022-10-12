import React from "react"
import OutsideNavbar from "../../components/navbar/outsideNavbar"
import style from "./team.module.css";
import Typed from "react-typed";
import { Tooltip } from "@material-ui/core";
import Footer from "../../components/footer/Footer.component";

export default function Team(){
    const textLines= ["Respected Founders, Developers, Startup Enthusiasts &amp; Entreprenurs,   <br />    <br />    I am Akshat Jain Bafna an IT Engineer and a Solopreneur who is intrisincally motivated to solve the problem of Retention and Cognition as I myself and many people like me face it on daily basis in there acedemics, professional life and personal life.    I have invested a lot of time to understand the problem itself(Cognitive Science) and deriving the <b>Complex Solution</b> to make learning easy for others.    <br />    Their isn't a Medicinal formula to solve this problem but their are multiple small solutions to solve this problem and make learning &amp; retention a piece of cake.    I don't know why even in 2022 there are this many loopholes in our education system, why nobody tried to make a product on this micro-requirement(there are solutions but not upto that mark).    If you see this as a problem and want to Join me in this journey you can connect with me on Finemate itself or below mentioned social networks."];
    return <>
        <OutsideNavbar />
        <div className={style.teamPageContainer}>
        <div className={style.aboutTeam}>
            <Typed strings={textLines} typeSpeed={40} />
        </div>
        <div className={style.linksContainer}>
            <div className={style.links}>
                <Tooltip title="Click to download Powerpoint Presentation a 3 minutes Read">
                <a href={require("../../assets/IMG_20220915_204539.jpg")} download="yoBiyatch.png"><img src={require("../../assets/leftCapsuleAllopethic.png")} alt =""/></a>
                </Tooltip>
            </div>
            <div className={style.links}>
                <Tooltip title= "Click to download Document a 10 minutes Read">
                <a href={require("../../assets/Finemate Draft 1 dated 06-08-22.pdf")} download="Finemate Draft 1 dated 06-08-22."> <img src={require("../../assets/rightHomepathic.png")} alt =""/> </a>
                </Tooltip>
            </div>
        </div>
            <br />
            <br />
        </div>
        <Footer />
    </>
}