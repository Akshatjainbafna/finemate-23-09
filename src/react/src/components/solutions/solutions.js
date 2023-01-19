import React, { useState } from "react";
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
    "Learning is a piece of cake"
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
          <h3>Practice makes a man perfect.</h3>
          <p>- English Proverb </p>
          <h3>We make Practicing Easier.</h3>
          <p>- Finemate </p>
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
                  "Learning is a piece of cake",
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
                  "Fulfilling all the digital requirements of institutes",
                  "Managing students is a piece of cake",
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
                  "Practice makes a professional perfect",
                  "Practicing is a piece of cake",
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
        <p>{text}🎂</p>
        <div className="solutionsImageContainer"> 
        <img className="solutionsImage" src={require(`../../assets/${image}`)} alt="" />  
        </div>
      </User>
      <br />
    </Container>
  );
};

const Container = styled.div`
  background: #fcfcfb;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 5vw 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 600px){
    margin: 5vh 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 15vh;
`;

const Image = styled.div`
  img {
    width: 40vw;
  }
  @media screen and (max-width: 600px){
    img {
      width: 80vw;
    }
  }
`;

const TextBox = styled.div`
  h3 {
    font-size: 2.5em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
  }
  @media screen and (max-width: 600px){
    margin: auto 5vw;
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
  margin-top: 5vh;
  text-align: center;

  .solutionsImageContainer{
    display: flex;
    justify-content: center;
  }
  h3 {
    font-size: 1.75em;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
    font-family: Open Sans;
  }
  p {
    color: #3e4345;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 1.25em;
  }

  .solutionsImage{
    width: 75vw;
  }
  @media screen and (max-width: 600px){
    .solutionsImage{
      width: 100vw;
      margin: 5vh 0;
    }
    h3 {
      font-size: 1.25em;
    }
    p {
      font-size: 1em;
    }
    p, h3{
    margin: auto 5vw;
    }
  }
`;
export default Solution;
