import React, { Component, useState } from 'react';
import style from "./todo.module.css";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputLabel, OutlinedInput, Radio, RadioGroup, Snackbar, Tooltip, useMediaQuery, useTheme } from '@material-ui/core';
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
    const [snackbarShow, setSnackbarShow] = useState(false);


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    function selectBgImage(image){
        setBgImg(image);
        console.log(image)
        for (let x=0; x < imgaes.length; x++){
            if (imgaes[x] == image){
                console.log(imgaes[x], image)
                document.getElementById(imgaes[x]).style.border="1px solid green";document.getElementById(imgaes[x]).style.boxShadow="0px 2px 1px green";
            }
            else{
                document.getElementById(imgaes[x]).style.border="1px solid #a5c5c5";document.getElementById(imgaes[x]).style.boxShadow="0px 2px 1px #a5c5c5";
            }
        }
    }
    
    function onChangeHandler(event){
        settitle(event.target.value);
        AxiosBaseFile.post('/api/get_todo_images', {title: event.target.value})
        .then(response => {
            setImages(response.data)
        })
    }
    function onSubmitHandler(){
        AxiosBaseFile.post('/api/add_todo', {'username' : localStorage.getItem('username'), 'title': title, 'importance': importance, 'inNewsfeed' : checked, 'imageName': bgImage})
        .then(response =>{
            setSnackbarShow(true);
            sessionStorage.setItem('todoCreated', true);
        })
        .catch(err => console.log(err))
        setTodoState(false);
    }

    return (
    <>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            open={snackbarShow} 
            autoHideDuration={4000} 
            message='To-Do added Successfully!' 
            onClose={() => setSnackbarShow(false)}
        >
        </Snackbar> 
        <Dialog
                        fullScreen={fullScreen}
                        fullWidth={true}
                        open={todoState}
                        onClose={() => setTodoState(false)}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle><b>Add To-Do</b></DialogTitle>
                        <DialogContent>
                            <div className='mb-4'>
                                <InputLabel htmlFor='titleOfThread'>Title</InputLabel>
                                <OutlinedInput fullWidth id="titleOfThread" type="text" name='title' placeholder="ex. Get 1 lt. Milk" inputProps={{maxLength: "80"}} value={title} onChange={(event) => onChangeHandler(event)} required/>
                            </div>

                            <div className='mb-4'>
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
                                    <FormControlLabel value="Extremely Important" control={<Radio  style={{color: 'green'}} />} label="Extremely Important" />
                                    <FormControlLabel value="Moderate Important" control={<Radio style={{color: 'green'}} />} label="Moderate Important" />
                                </div>
                            </RadioGroup>
                            </div>


                        <div className='mb-4'>

                               
                            {imgaes.length > 0 ? 
                                <InputLabel>Select Picture for To-Do</InputLabel>: null}
                        <RadioGroup
                            aria-labelledby="bgImage"
                            value={bgImage}
                            onChange={(event) => {selectBgImage(event.target.value)}}
                            name='bgImage'
                            >
                            <div className="d-flex justify-content-around flex-wrap">
                            {imgaes.map((image, index) =>
                                <div key={index} id={image} className={style.todoCard}> 
                                    <FormControlLabel value={image} control={<Radio style={{display: 'none'}} />} label={<img src={require('../../assets/todoImages/'+ image)} alt='todo' className={style.todoImages} />} />
                                </div>
                             )}
                            </div>

                        </RadioGroup>
                        </div>

                        </DialogContent>
                        <DialogActions>
                            <Button style={{color : '#A78EC3'}} onClick={() => setTodoState(false)}>
                                Cancel
                            </Button>
                            <Button style={{backgroundColor : '#A78EC3', color: '#ffffff'}} type="submit" onClick={() => onSubmitHandler()}>
                                Add Todo
                            </Button>
                        </DialogActions>
                    </Dialog>
                    </>
    )
}


class TodoComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            addTodo: false,
            toggle: false,
            allTodoList: [],
            todoDeleted: false
        }
        this.addTodoWindow = this.addTodoWindow.bind(this);
        this.switchTodoList = this.switchTodoList.bind(this);
    }

    addTodoWindow(){
        this.setState({addTodo: !this.state.addTodo})
    }
    switchTodoList(){
        this.setState({toggle: !this.state.toggle})
    }

    deleteTodo(event, index){
        var title = event.target.value;
        setTimeout(()=>{
            AxiosBaseFile.post('/api/delete_todo', {'username' : localStorage.getItem('username'), "title" : title})
        .then(() => {
            const allTodoList = this.state.allTodoList;
            allTodoList.splice(index, 1);
            this.setState({allTodoList: allTodoList, todoDeleted: true})
            for(let x=0; x < allTodoList.length; x++){
                let todoId = 'todo' + x;
                document.getElementById(todoId).style.border = '1px solid #a5c5c5';
                document.getElementById(todoId).style.boxShadow = '0px 2px 1px #a5c5c5';
            }
        })
        .catch(err => console.log(err)) 
        }, 200)
    }
    componentDidMount(){
        AxiosBaseFile.post('/api/get_all_todo_for_user', {'username' : localStorage.getItem('username')})
        .then(res => {
            this.setState({allTodoList: res.data.todo})
        })
        .catch(err => console.log(err))
        this.todoCreated = setInterval(()=> {
            if (sessionStorage.getItem('todoCreated') == 'true'){

                AxiosBaseFile.post('/api/get_all_todo_for_user', {'username' : localStorage.getItem('username')})
                .then(res => {
                    sessionStorage.setItem('todoCreated', false)
                this.setState({allTodoList: res.data.todo})
        })
        .catch(err => console.log(err))
            }
        }, 2000);
}
componentWillUnmount(){
    clearInterval(this.todoCreated)
}
    render(){
        return(
            <>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            open={this.state.todoDeleted} 
            autoHideDuration={4000} 
            message='To-Do deleted Successfully!' 
            onClose={() => this.setState({todoDeleted: false})}
        >
        </Snackbar> 
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
                    <div key={index} id={'todo'+index} className={style.todoCard} onClick={() => {
                        const todoId = 'todo' + index;
                        document.getElementById(todoId).style.border="1px solid red";
                        document.getElementById(todoId).style.boxShadow="0px 2px 1px red";
                        }}>
                        <Tooltip title={todo.title}>
                            <FormControlLabel value={todo.title} onChange={(event) => this.deleteTodo(event, index) } control={<Checkbox style={{display: 'none'}} />} label={<img src={require('../../assets/todoImages/'+ todo.image)} alt='todo image' className={style.todoImages} />} />
                        </Tooltip>
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
