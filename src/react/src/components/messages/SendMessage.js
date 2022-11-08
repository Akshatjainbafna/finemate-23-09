import React, { Component } from 'react'
import createMessage from '../../assets/createMessage.png'
import AxiosBaseFile from '../AxiosBaseFile'
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
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        AxiosBaseFile.post('/api/db_send_message', {'username1': localStorage.getItem('username'), 'username2': localStorage.getItem('targetUser'), 'message': this.state.message})
        .catch(err => console.log(err))
        
        this.setState({message:''});
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