import React, { useEffect, useState } from "react"
import OutsideNavbar from "../../components/navbar/outsideNavbar"
import style from "./team.module.css";
import Typed from "react-typed";
import { Tooltip } from "@material-ui/core";
import Footer from "../../components/footer/Footer.component";
import LoadingGif from "../../components/loadingGif";

export default function Team(){
    const [loading, setLoading] = useState(true);
    const textLines= ["Dear esteemed investors, developers, startup enthusiasts, and entrepreneurs, <br />  <br />  I am Akshat Jain Bafna, an IT engineer and solopreneur who is driven to address the issue of poor retention and incomplete cognition. This is a problem that I, along with many others, experience on a daily basis in our academic, professional, and personal lives. I have dedicated a significant amount of time studying the problem and developing a comprehensive solution to make learning easier for others. <br />    While there is no one-size-fits-all solution to solve this problem, there are multiple strategies that can help improve retention and make learning more effective. I am puzzled as to why, even in 2022, there are so many shortcomings in our education system and why more solutions have not been developed to address this important issue. If you share my concern and would like to join me in addressing this problem, please feel free to contact me on Finemate or through the social networks mentioned below. <br /> <br />   Sincerely, <br />   Akshat Jain Bafna"];
    
    useEffect(() =>{
        setTimeout(() => {
            setLoading(false)
            }, 2000);
    })
    if (loading){
        return  <div className="loadingGif">
                    <LoadingGif />
                </div>
      }
    return <>
        <OutsideNavbar />
        <div className={style.teamPageContainer}>
        <div className={style.aboutTeam}>
            <Typed strings={textLines} typeSpeed={10} />
        </div>
        <div className={style.linksContainer}>
            <div className={style.links}>
                <Tooltip title="Click to download Powerpoint Presentation a 3 minutes Read">
                <a href={require("../../assets/Finemate Presentation Pitch Deck.pdf")} download="Finemate Pitch Deck"><img src={require("../../assets/leftCapsuleAllopethic.png")} alt =""/></a>
                </Tooltip>
            </div>
            <div className={style.links}>
                <Tooltip title= "Click to download Document a 6 minutes Read">
                <a href={require("../../assets/Finemate Draft.pdf")} download="Finemate Draft"> <img src={require("../../assets/rightHomepathic.png")} alt =""/> </a>
                </Tooltip>
            </div>
        </div>
            <br />
            <br />
        </div>
        <Footer />
    </>
}