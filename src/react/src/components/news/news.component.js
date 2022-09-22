import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import change from '../../assets/change.png'
import book from '../../assets/open-book.png'
import computer from '../../assets/computer.png'
import logo from '../../assets/uimpactify-logo.png'
import style from './news.module.css'


class News extends Component {
    render() {
        return (
            <>
            <div className={style.classCardTitleStyle}>News</div>
            <Card className={style.classCardStyle}>
                <Card.Body>
                    <div className={style.tabs}>
                        <input name="tabNews" type="radio" id="tabNews-1" checked="checked" className={style.input} />
                        <label for="tabNews-1" className={style.label}>Course Related</label>
                        <div className={style.panel}>
                            <h1>New courses have been added!</h1>
                            <img className={style.textbox} src={book} ></img>
                            <p> Check out the newly added courses in the classes section</p>
                            <div className={style.btnLearn}>
                            <button className={style.btnLearnMore}><a href="http://localhost:3000/allclasslist">view courses</a></button>
                            </div>
                        </div>


                        <input name="tabNews" type="radio" id="tabNews-2" className={style.input} />
                        <label for="tabNews-2" className={style.label}>Institute</label>
                        <div className={style.panel}>
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
                            <h1>CFC launches new campaign</h1>
                            <div className="picture-cfc">
                                <img className={style.textbox} src={change} ></img>
                                <p>Technology for improved education Guatemela is a project designed to improve the quality of eduction in Guatemala</p>
                            </div>
                            <div className={style.btnLearn}>
                                <button className={style.btnLearnMore}>Learn More</button>
                            </div>
                        </div>

                        <input name="tabNews" type="radio" id="tabNews-3" className={style.input} />
                        <label for="tabNews-3" className={style.label}>Teacher</label>
                        <div className={style.panel}>
                        <h1>AI system discovers new useful material</h1>
                            <img className={style.textbox} src={computer} ></img>
                            <p>an AI algorithm called CAMEO that discovered a potentially useful new material</p>
                            <div className={style.btnLearn}>
                                <button className={style.btnLearnMore}><a href="https://www.sciencedaily.com/releases/2020/11/201124092150.htm">learn more</a></button>
                            </div>
                        </div>

                        <input name="tabNews" type="radio" id="tabNews-4" className={style.input} />
                        <label for="tabNews-4" className={style.label}>Other</label>
                        <div className={style.panel}>
                        <h1>Want to know more about UImpactify</h1>
                            <img className={style.textbox} src={logo} ></img>
                            <p>learn more about UImpactify!</p>
                            <div className={style.btnLearn}>
                                <button className={style.btnLearnMore}><a href="http://localhost:3000/faq">learn more</a></button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
                <div className='square'></div>
            </Card>
            </>
            );
    }
}
export default News;