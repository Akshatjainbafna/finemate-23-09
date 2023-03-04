import { ArrowDownwardOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";

export default function DoYouForgetThingsOften() {
  return (
    <Container>
      <div className="doYouForgetThingsOften">
        Do You forget things Often?
      </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;

/* title styles */
.doYouForgetThingsOften{
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

  position: relative;
  overflow: hidden;
  display: block;
  line-height: 1.5;
}

.doYouForgetThingsOften::after{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, #8C52FF, #BAA3D7, #FBEAAF, #64BAA9);
    animation: a-ltr-after 2s cubic-bezier(.77,0,.18,1) 1s forwards;
    transform: translateX(-101%);
}

.doYouForgetThingsOften::before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--lightBackgroundPrimary);
    animation: a-ltr-before 2s cubic-bezier(.77,0,.18,1) 1s forwards;
    animation-delay: 1s;
    transform: translateX(0);
}


@keyframes a-ltr-after{
    0% {transform: translateX(-100%)}
    100% {transform: translateX(101%)}
}

@keyframes a-ltr-before{
    0% {transform: translateX(0)}
    100% {transform: translateX(200%)}
}


/* mouse icon animation*/
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
`