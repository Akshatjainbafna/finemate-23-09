import React, { Component } from 'react'
import axios from 'axios';
import createMessage from '../../assets/createMessage.png'
import style from './SendMessage.module.css'

class SendMessage extends Component {
    constructor() {
        super()
        this.state = {
            message:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        },()=> console.log(this.state.message))
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('http://127.0.0.1:8103/api/db_send_message', {'username1': localStorage.getItem('username'), 'username2': localStorage.getItem('targetUser'), 'message': this.state.message})
        .then(res => {
            console.log(res);
            
        });
        this.setState({
            message:''
        })
    }

    render() {
        return (
            <div className={style.messagePos}>
                <form
                    onSubmit={this.handleSubmit}
                    className={style.formInlineMessage}>
                    <input className={style.formControlMessage}
                        onChange={this.handleChange}
                        value={this.state.message}
                        placeholder='Enter your message'
                        type='text'/>
                    <button className={style.writeButton} onClick={this.handleSubmit}>
                         <img
                             src={createMessage}
                             alt={createMessage}/>
                    </button>
                </form>
            </div>
        )
    }

}

export default SendMessage