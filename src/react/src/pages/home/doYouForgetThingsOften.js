import { ArrowDownwardOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";

export default function DoYouForgetThingsOften(){
    const [scrollButton, setShowScrollButton] = useState(true)
    return (
        <Container>
            {(()=> {
	function reveal() {
		var reveals = document.querySelectorAll(".reveal");
        setShowScrollButton(false);
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
        <div className="reveal">
            Do You forget things Often?
        </div>
        {scrollButton && (<div className="position-fixed d-flex flex-column justify-items-center align-items-center">
        <div style={{fontFamily: 'Poppins, sans-serif'}}>
          Scroll Slowly
        </div>
        <div class="mouse-icon">
          <div class="wheel"></div>
        </div>
        </div>)}
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 105vh;
/* ---------------------------------------------- /*
* Mouse animate icon
/* ---------------------------------------------- */
.mouse-icon {
 border: 2px solid #212529;
 border-radius: 16px;
 height: 40px;
 width: 24px;
 display: block;
 z-index: 10;
}
.mouse-icon .wheel {
 -webkit-animation-name: drop;
 -webkit-animation-duration: 1s;
 -webkit-animation-timing-function: linear;
 -webkit-animation-delay: 0s;
 -webkit-animation-iteration-count: infinite;
 -webkit-animation-play-state: running;
 -webkit-animation-name: drop;
         animation-name: drop;
 -webkit-animation-duration: 1s;
         animation-duration: 1s;
 -webkit-animation-timing-function: linear;
         animation-timing-function: linear;
 -webkit-animation-delay: 0s;
         animation-delay: 0s;
 -webkit-animation-iteration-count: infinite;
         animation-iteration-count: infinite;
 -webkit-animation-play-state: running;
         animation-play-state: running;
}
.mouse-icon .wheel {
 position: relative;
 border-radius: 10px;
 background: #000;
 width: 2px;
 height: 6px;
 top: 4px;
 margin-left: auto;
 margin-right: auto;
}
@-webkit-keyframes drop {
 0% {
   top: 5px;
   opacity: 0;
 }
 30% {
   top: 10px;
   opacity: 1;
 }
 100% {
   top: 25px;
   opacity: 0;
 }
}
@keyframes drop {
 0% {
   top: 5px;
   opacity: 0;
 }
 30% {
   top: 10px;
   opacity: 1;
 }
 100% {
   top: 25px;
   opacity: 0;
 }
}
    .reveal{
        font: bold 4em 'Bangers', cursive;
        background-image: linear-gradient(45deg, #8C52FF, #BAA3D7, #FBEAAF, #64BAA9);
        
        padding: 0 10px;
        text-align: center;
          /* Use the text as a mask for the background. */
          /* This will show the gradient as a text color rather than element bg. */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; 
          -moz-background-clip: text;
          -moz-text-fill-color: transparent;
    }
`