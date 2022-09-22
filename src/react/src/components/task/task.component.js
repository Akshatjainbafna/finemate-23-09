import React, { Component } from "react";
import style from './task.module.css';

class TaskComponent extends Component{
    render(){
        return(
            <>
            <div className={style.taskHeader}>Tasks</div>
            <div className={style.taskFilter}>Filter</div>
            <div className={style.taskBody}>
                <span className={style.task}><span className={style.taskHeading}>Write an Assay on Global Warming</span><span className={style.subject}>English</span><span className={style.submissionDate}>May 10</span><span className={style.submissionTime}>11:59 pm</span></span>
                <span className={style.task}><span className={style.taskHeading}>Write an Assay on Child Labor</span><span className={style.subject}>English</span><span className={style.submissionDate}>May 12</span><span className={style.submissionTime}>11:59 pm</span></span>
                <span className={style.task}><span className={style.taskHeading}>Write a thesis on Mughal Emperor</span><span className={style.subject}>History</span><span className={style.submissionDate}>May 12</span><span className={style.submissionTime}>11:59 pm</span></span>
                <span className={style.task}><span className={style.taskHeading}>Assignment 4</span><span className={style.subject}>Science</span><span className={style.submissionDate}>May 15</span><span className={style.submissionTime}>11:59 pm</span></span>
                <span className={style.task}><span className={style.taskHeading}>Extra Class</span><span className={style.subject}>English</span><span className={style.submissionDate}>May 16</span><span className={style.submissionTime}>1:00pm</span></span>
            </div>
            </>
        );
    }
}
export default TaskComponent