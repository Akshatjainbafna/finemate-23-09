import { Button, InputLabel, MenuItem, OutlinedInput, Select, useTheme } from '@material-ui/core';
import React, { Component } from 'react';
import './profile.css';
import {BsXCircleFill} from 'react-icons/bs';
import Axios from 'axios';
import { Form, FormControl } from 'react-bootstrap';

class ColourText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: '',
            added: []
        }
    }
    handleChange(event, field){
        Axios.delete('http://127.0.0.1:8103/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data==true){
                switch(String(field)){
                    case 'education':
                        Axios.put('http://127.0.0.1:8103/api/db_add_profile_education', { education : event.target.value, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, event.target.value]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => console.log(err))
                        break;
                    case 'skill':
                        Axios.put('http://127.0.0.1:8103/api/db_add_profile_skill', {skill: event.target.value, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, event.target.value]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'language':
                        Axios.put('http://127.0.0.1:8103/api/db_add_profile_language', {language: event.target.value, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, event.target.value]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'interest':
                        Axios.put('http://127.0.0.1:8103/api/db_add_profile_interest', {interest: event.target.value, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, event.target.value]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                }
            }
            else{
                alert('You are not authorized for this action.')
            }
        })
    }
    removeItem(item, field){
        Axios.delete('http://127.0.0.1:8103/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data==true){
                switch(String(field)){
                    case 'education':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_education', {education: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'skill':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_skill', {skill: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'language':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_language', {language: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'interest':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_interest', {interest: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                }
            }
            else{
                alert('You are not authorized for this action.')
            }
        })
    }
    removeNewlyAddedItem(item, index, field){
        Axios.delete('http://127.0.0.1:8103/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data==true){
                switch(String(field)){
                    case 'education':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_education', {education: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'skill':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_skill', {skill: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'language':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_language', {language: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'interest':
                        Axios.post('http://127.0.0.1:8103/api/db_delete_profile_interest', {interest: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                }
            }
            else{
                alert('You are not authorized for this action.')
            }
        })
    }
    render() {
        const { textInfo } = this.props;
        const { field } = this.props;
        const { listOfItems } = this.props;
        const { editMode } = this.props;
        var res = {};
        var array = []
        for (var i = 0; i < textInfo.length; i++){
            res['text'] = textInfo[i];
            array[i] = JSON.parse(JSON.stringify(res));
        }
       
        // console.log(array)
        return(
                <span className="listed_educations_list" >
                    {array.map(
                        (texts, index) => 
                        <div key={index} className='d-flex listItemContainer'>
                            <li className='colourTextListItems'>{texts.text}</li>
                            {editMode ? <BsXCircleFill onClick={() => this.removeItem(texts.text, field)} className='removeEducations' /> : ''}
                        </div>
                    )}
                    {this.state.added.map(
                       (texts, index) => 
                       <div key={index} className='d-flex listItemContainer'>
                           <li className='colourTextListItems'>{texts}</li>
                           {editMode ? <BsXCircleFill onClick={() => this.removeNewlyAddedItem(texts, index, field)} className='removeEducations' /> : ''}
                       </div> 
                    )}
                    {editMode ? 
                    <div className='mt-3'>
                            <Select
                                value={this.state.itemName}
                                onChange={(event) => this.handleChange(event, field)}
                                input={<OutlinedInput className='selectFormColortext' />}
                                >
                                    {listOfItems.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                 </div>: ''}
                </span>
            )
        }
}
export default ColourText
