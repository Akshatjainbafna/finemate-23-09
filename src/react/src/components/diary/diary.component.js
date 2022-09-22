import React, { Component } from "react";
import style from "./diary.module.css";

class Diary extends Component{
    render(){
        return(
           <>
            <div className={style.diaryHeader}>Diary</div>
            <div className={style.diaryBody}>
                <ul className={style.diaryList}>
                    <li>April 2021</li>
                        <ul><li>Hello</li><li>Hello</li><li>Hello</li><li>Hello</li><li>Hello</li><li>Hello</li></ul>
                    <li>May 2021</li>
                        <ul><li>Hello</li><li>Hello</li></ul>
                </ul>
            </div>
           </>
        );
    }
}
export default Diary