import React, { Component, useState } from "react";
import styled from "styled-components";
import "./solutions.css";
import { SolutionsButton } from "./solutionsButton.js";
import main from "../../assets/solutionsComponent.svg";

export const Solution = () => {
  const [firstStyle, setFirstStyle] = useState("solutions--btn--primary");
  const [secondStyle, setSecondStyle] = useState("solutions--btn--secondary");
  const [thirdStyle, setThirdStyle] = useState("solutions--btn--secondary");

  const [title, setTitle] = useState("Learn Better and Retain Better");

  const [text, setText] = useState(
    "Making Learning and Revising just a piece of Cake."
  );

  const [image, setImage] = useState("studentsSolution.svg");

  const setUser = (firstStyle, secondStyle, thirdStyle, title, text, image) => {
    setFirstStyle(firstStyle);
    setSecondStyle(secondStyle);
    setThirdStyle(thirdStyle)
    setTitle(title);
    setText(text);
    setImage(image);
  };

  return (
    <Container>
      <Wrapper>
        <TextBox>
          <h3 className="ml-1">Solutions</h3>
        </TextBox>
        <Image>
          <img src={main} alt="" />
        </Image>
      </Wrapper>
      <p>
            Let's see them all one by one...
          </p>
          <Buttons>
            <SolutionsButton
              className="firstButton"
              onClick={() => {
                setUser(
                  "solutions--btn--primary",
                  "solutions--btn--secondary",
                  "solutions--btn--secondary",
                  "Learn Better and Retain Better",
                  "Making Learning and Revising just a piece of Cake.",
                  "studentsSolution.svg"
                );
              }}
              type="button"
              buttonStyle={firstStyle}
            >
              Students
            </SolutionsButton>
            <SolutionsButton
              onClick={() => {
                setUser(
                  "solutions--btn--secondary",
                  "solutions--btn--primary",
                  "solutions--btn--secondary",
                  "An Application that fullfills all the Digital requirements",
                  "Making Managing students just a piece of Cake.",
                  "instituteSolution.svg"
                );
              }}
              type="button"
              buttonStyle={secondStyle}
            >
              Institutes
            </SolutionsButton>
            <SolutionsButton
              onClick={() => {
                setUser(
                  "solutions--btn--secondary",
                  "solutions--btn--secondary",
                  "solutions--btn--primary",
                  "Learn Better and Retain Better",
                  "Enhance your skills sets and knowledges to advance your business.",
                  "professionalsSolution.svg"
                );
              }}
              type="button"
              buttonStyle={thirdStyle}
            >
              Professionals
            </SolutionsButton>
          </Buttons>
          <br />
          
      <User>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="solutionsImageContainer"> 
        <img className="solutionsImage" src={require(`../../assets/${image}`)} alt="" />  
        </div>
      </User>
    </Container>
  );
};

const Container = styled.div`
  background: #fcfcfb;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10vh;
`;

const Image = styled.div`
  img {
    
  }
`;

const TextBox = styled.div`
  h3 {
    font-size: 4em;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
  }
  p {
    font-weight: normal;
    color: #3e4345;
    font-family: Open Sans;
    font-size: 1.5em;
  }
`;

const Buttons = styled.div`
  .firstButton {
    margin-right: 3rem;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vh;
  margin-bottom: 12rem;
  .solutionsImageContainer{
    display: flex;
    justify-content: center;
  }
  h3 {
    font-size: 36px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
  }
  p {
    font-weight: normal;
    color: #3e4345;
    font-family: Open Sans;
    font-size: 22px;
  }

  img {
    width: 80%;
    margin-top: 4rem;
  }
`;
export default Solution;
