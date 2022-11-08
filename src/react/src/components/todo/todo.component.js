import React, { Component, useEffect, useState } from 'react';
import style from "./todo.module.css";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputLabel, OutlinedInput, Radio, RadioGroup, useMediaQuery, useTheme } from '@material-ui/core';
import { BsPatchPlus, BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import AxiosBaseFile from '../AxiosBaseFile';


function AddTodoComponent(props){
    const [todoState, setTodoState] = useState(props.todo);
    const [title, settitle] = useState();
    const [importance, setImportance] = useState();
    const [bgImage, setBgImg] = useState(false);
    const [checked, setChecked] = useState(false);
    const [imgaes, setImages] = useState([]);


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    useEffect(() => {
        AxiosBaseFile.post('/api/get_todo_images', {title: title})
        .then(response => {
            setImages(response.data)
        })
    })

    function onSubmitHandler(){
        AxiosBaseFile.post('/api/add_todo', {'username' : localStorage.getItem('username'), 'title': title, 'importance': importance, 'inNewsfeed' : checked, 'imageName': bgImage})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        setTodoState(false);
    }
    function deleteTodo(event){
        AxiosBaseFile.post('/api/delete_todo', {'username' : localStorage.getItem('username'), "title" : event.target.value})
        .then(() => {
            settitle(null);
        })
        .catch(err => console.log(err))  
    }

    return (
    <>
        <Dialog
                        fullScreen={fullScreen}
                        fullWidth={true}
                        open={todoState}
                        onClose={() => setTodoState(false)}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle color="primary"><b>Add Todo</b></DialogTitle>
                        <DialogContent>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <InputLabel htmlFor='titleOfThread'>Title</InputLabel>
                                    <OutlinedInput id="titleOfThread" type="text" name='title' placeholder="Add a Intriguing title..." inputProps={{maxLength: "80"}} value={title} onChange={(event) => settitle(event.target.value)} required/>
                                </div>
                                <div>
                                    <FormControlLabel onChange={() => setChecked(!checked) } control={<Checkbox />} label="Notification" />
                                </div>
                            </div>
                            <p></p>

                            <InputLabel htmlFor='importanceOfTodo'>Importance</InputLabel>
                            <RadioGroup
                            id="importanceOfTodo"
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={importance}
                            onChange={(event) => setImportance(event.target.value)}
                            name="ImportanceRadioGroup"
                            required
                            >
                                <div className='d-flex'>
                                    <FormControlLabel value="Extremely Important" control={<Radio />} label="Extremely Important" />
                                    <FormControlLabel value="Moderate Important" control={<Radio />} label="Moderate Important" />
                                </div>
                            </RadioGroup>
                            <p></p>


                        <RadioGroup
                            aria-labelledby="bgImage"
                            value={bgImage}
                            onChange={(event) => {setBgImg(event.target.value); console.log(event.target.value)}}
                            name='bgImage'
                            >

                            <div className="d-flex justify-content-around flex-wrap">
                            {imgaes.map((image) =>
                                <div className={style.todoCard}> 
                                    <FormControlLabel value={image} control={<Radio style={{display: 'none'}} />} label={<img src={require('../../assets/todoImages/'+ image)} alt='todo image' className={style.todoImages} />} />
                                </div>
                             )}
                            </div>

                        </RadioGroup>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setTodoState(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" onClick={() => onSubmitHandler()}>
                                Add Todo
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {title? 
                    <div className="ml-4"><FormControlLabel value={title} onChange={(event) => deleteTodo(event)} control={<Checkbox />} label={title} /></div>
                    : null}
                    </>
    )
}


class TodoComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            addTodo: false,
            toggle: false,
            allTodoList: []
        }
        this.addTodoWindow = this.addTodoWindow.bind(this);
        this.switchTodoList = this.switchTodoList.bind(this);
    }

    addTodoWindow(){
        console.log("todo")
        this.setState({addTodo: !this.state.addTodo})
    }
    switchTodoList(){
        console.log("toggle")
        this.setState({toggle: !this.state.toggle})
    }

    deleteTodo(event, index){
        console.log(event.target.value)
        AxiosBaseFile.post('/api/delete_todo', {'username' : localStorage.getItem('username'), "title" : event.target.value})
        .then(() => {
            const allTodoList = this.state.allTodoList;
            allTodoList.splice(index, 1);
            this.setState({allTodoList: allTodoList})
        })
        .catch(err => console.log(err))  
    }
    componentDidMount(){
        AxiosBaseFile.post('/api/get_all_todo_for_user', {'username' : localStorage.getItem('username')})
        .then(res => {
            this.setState({allTodoList: res.data.todo}, () => console.log(this.state.allTodoList, res.data))
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <>
            <div className={style.todoComponentContainer}>
            <div className={style.todoBlock}>
                Do it Quickly
            </div>
            {/*<div className={style.dropdownContent}>
                <a href="">Recently Added</a>
                <a href="">Earliest Todo's</a>
        </div>*/}
            <div className={style.todoIcons}>
                <Button onClick={this.addTodoWindow}>
                    <IconContext.Provider value={{size: "25px", color: "orange"}}>
                        <BsPatchPlus />
                    </IconContext.Provider>
                    </Button>
                <Button onClick={this.switchTodoList} >{this.state.toggle ? 
                    <IconContext.Provider value={{size: "25px", color: "orange"}}>
                        <BsToggle2Off />
                    </IconContext.Provider> : 
                    <IconContext.Provider value={{size: "25px", color: "orange"}}>
                        <BsToggle2On />
                    </IconContext.Provider>
                    } 
                </Button>
            </div>
            {this.state.addTodo ? <AddTodoComponent todo={true} />   : null }

            {this.state.toggle ? 
            
            this.state.allTodoList.map((todo, index) =>
            <div key={index} className="ml-4">
                <FormControlLabel value={todo.title} onChange={(event) => this.deleteTodo(event, index) } control={<Checkbox />} label={todo.title} />
            </div>
            )

            : 
            
            <div className={style.todoCardContainer}>
                {this.state.allTodoList.map((todo, index) =>
                    <div key={index}  className={style.todoCard}>
                        <FormControlLabel value={todo.title} onChange={(event) => this.deleteTodo(event, index) } control={<Checkbox style={{display: 'none'}} />} label={<img src={require('../../assets/todoImages/'+ todo.image)} alt='todo image' className={style.todoImages} />} />
                    </div>
                    )
                }
            </div>
        }
            </div>
            </>
        );
    }
}
export default TodoComponent
