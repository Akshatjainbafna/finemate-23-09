import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import change from '../../assets/change.png'
import book from '../../assets/open-book.png'
import computer from '../../assets/computer.png'
import logo from '../../assets/finemateLatestin Angelina fontLogo for Tablet Screens.png'
import style from './news.module.css'


class News extends Component {
    constructor(props){
        super(props);
        this.state ={
            redirectToCourses: false,
            redirectToAbout: false
        }
    }
    displayPanel(panel){
        for (let x=1; x<=4; x++){
            var panelId= 'panel'+String(x);
            if (panelId == panel){
                document.getElementById(panelId).style.display="block";
            }
            else{
                document.getElementById(panelId).style.display="none";
            }
        }
    }

    
    render() {
        if (this.state.redirectToCourses){
            return <Redirect to="/allclasslist" />
        }
        if (this.state.redirectToAbout){
            return <Redirect to="/about" />
        }
        return (
            <>
        
                <div className={style.tabs}>
                    { localStorage.getItem('usertype') == 'student' ?
                        <div className="d-flex justify-content-around mt-2">
                            <span>
                                <input name="tabNews" type="radio" id="tabNews-1" className={style.input} onChange={() => this.displayPanel("panel1")} />
                                <label for="tabNews-1" className={style.label}>Course Updates</label>
                            </span>
                            <span>
                                <input name="tabNews" type="radio" id="tabNews-2" className={style.input} onChange={() => this.displayPanel("panel2")}/>
                                <label for="tabNews-2" className={style.label}>Institute</label>
                            </span>
                            <span>
                                <input name="tabNews" type="radio" id="tabNews-3" className={style.input} onChange={() => this.displayPanel("panel3")}/>
                                <label for="tabNews-3" className={style.label}>Teacher</label>
                            </span>
                            <span>
                                <input name="tabNews" type="radio" id="tabNews-4" className={style.input} onChange={() => this.displayPanel("panel4")}/>
                                <label for="tabNews-4" className={style.label}>Other</label>
                            </span>
                        </div>
                        :
                        <div className="d-flex justify-content-center mt-2">
                            <span>
                                <input name="tabNews" type="radio" id="tabNews-1" className={style.input} checked onChange={() => this.displayPanel("panel1")} />
                                <label for="tabNews-1" className={style.label}>Course Updates</label>
                            </span>
                        </div>
                    }


                        <div className={style.panelContainer}>
                        <div className={style.panel} id="panel1">
                            <h1 className={style.newsTitle}>New courses have been added!</h1>
                            <img className={style.textbox} src={book} ></img>
                            <p> Check out the newly added courses in the classes section</p>
                            <div className={style.btnLearn}>
                            <button className={style.btnLearnMore} onClick={() => {this.setState({redirectToCourses: true})}}>Learn More</button>
                            </div>
                        </div>


                        
                        <div className={style.panel} id="panel2">
                            <h1 className={style.newsTitle}>CFC launches new campaign</h1>
                            <div className="picture-cfc">
                                <img className={style.textbox} src={change} ></img>
                                <p>Technology for improved education Guatemela is a project designed to improve the quality of eduction in Guatemala</p>
                            </div>
                            <h1>CFC launches new campaign</h1>
                            <div className="picture-cfc">
                                <img className={style.textbox} src={change} ></img>
                                <p>Technology for improved education Guatemela is a project designed to improve the quality of eduction in Guatemala</p>
                            </div>
                            <h1>CFC launches new campaign</h1>
                            <div className="picture-cfc">
                                <img className={style.textbox} src={change} ></img>
                                <p>Technology for improved education Guatemela is a project designed to improve the quality of eduction in Guatemala</p>
                            </div>
                            <div className={style.btnLearn}>
                                <button className={style.btnLearnMore} onClick={() => {this.setState({redirectToCourses: true})}}>Learn More</button>
                            </div>
                        </div>

                        
                        <div className={style.panel} id="panel3">
                        <h1 className={style.newsTitle}>AI system discovers new useful material</h1>
                            <img className={style.textbox} src={computer} ></img>
                            <p>an AI algorithm called CAMEO that discovered a potentially useful new material</p>
                            <div className={style.btnLearn}>
                                <button className={style.btnLearnMore} onClick={() => {this.setState({redirectToCourses: true})}}>learn more</button>
                            </div>
                        </div>

                        
                        <div className={style.panel} id="panel4">
                        <h1 className={style.newsTitle}>Want to know more about Finemate</h1>
                            <img className={style.textbox} src={logo} ></img>
                            <p>learn more about Finemate!</p>
                            <div className={style.btnLearn}>
                                <button className={style.btnLearnMore} onClick={() => {this.setState({redirectToAbout: true})}}>learn more</button>
                            </div>
                        </div>
                        </div>
                </div>
            </>
            );
    }
}
export default News;