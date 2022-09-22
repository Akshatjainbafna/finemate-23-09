import React, { Component } from 'react';
import style from "./todo.module.css";
import addTodo from '../../assets/addTodo.png'
import changeView from '../../assets/changeView.png'
import Card from 'react-bootstrap/Card'

class TodoComponent extends Component{
    render(){
        return(
            <>
            <div className={style.todoBlock}>
                Do it Quickly
            </div>
            {/*<div className={style.dropdownContent}>
                <a href="">Recently Added</a>
                <a href="">Earliest Todo's</a>
        </div>*/}
            <div className={style.todoIcons}>
                <div className={style.addTodo}><a  href="#"><img src={addTodo}/></a></div>
                <div className={style.changeView}><a  href="#"><img src={changeView}/></a></div>
            </div>
            <div className={style.todoCards}>
            
                <Card style={{width: '6vw', height:'6vw',  margin: '2px', overflow:"hidden"}}>
                    <Card.Img variant="top" src="https://image.shutterstock.com/image-illustration/tomato-illustration-on-white-background-260nw-88607548.jpg" alt="tomato"/>
                    <Card.Body>
                    </Card.Body>
                </Card>
                <Card style={{width: '6vw', height:'6vw',  margin: '2px',  overflow:"hidden"}}>
                    <Card.Img variant="top" src="https://image.shutterstock.com/image-illustration/tomato-illustration-on-white-background-260nw-88607548.jpg" alt="tomato"/>
                    <Card.Body>
                    </Card.Body>
                </Card>
                <Card style={{width: '6vw', height:'6vw',  margin: '2px',  overflow:"hidden"}}>
                    <Card.Img variant="top" src="https://image.shutterstock.com/image-illustration/tomato-illustration-on-white-background-260nw-88607548.jpg" alt="tomato"/>
                    <Card.Body>
                    </Card.Body>
                </Card>
                <Card style={{width: '6vw', height:'6vw',  margin: '2px',  overflow:"hidden"}}>
                    <Card.Img variant="top" src="https://image.shutterstock.com/image-illustration/tomato-illustration-on-white-background-260nw-88607548.jpg" alt="tomato"/>
                    <Card.Body>
                    </Card.Body>
                </Card>
            </div>
            </>
        );
    }
}
export default TodoComponent