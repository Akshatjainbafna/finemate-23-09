import React, { Component } from 'react';
import './profile.css';
import {BsXCircleFill} from 'react-icons/bs';
import { Add } from '@material-ui/icons';
import AxiosBaseFile from '../AxiosBaseFile';

class ColourText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: '',
            added: [],
            listOfItems: this.props.listOfItems
        }
    }
    handleChange(event, field){
        event.preventDefault();
        AxiosBaseFile.delete('/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data===true){
                switch(String(field)){
                    case 'education':
                        if (this.state.listOfItems.includes(this.state.itemName)){
                        AxiosBaseFile.put('/api/db_add_profile_education', { education : this.state.itemName, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, this.state.itemName]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => console.log(err))
                        }
                        else{
                            document.getElementById('ErrorMessage').innerHTML="You can't add " + this.state.itemName + '. The Subject name is misspelled or character mismatched.'
                        }
                        break;
                    case 'skill':
                        AxiosBaseFile.put('/api/db_add_profile_skill', {skill: this.state.itemName, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, this.state.itemName]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'language':
                        AxiosBaseFile.put('/api/db_add_profile_language', {language: this.state.itemName, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, this.state.itemName]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'interest':
                        AxiosBaseFile.put('/api/db_add_profile_interest', {interest: this.state.itemName, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, this.state.itemName]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'hate':
                        AxiosBaseFile.put('/api/db_add_profile_hate', {hate: this.state.itemName, username: localStorage.getItem('username')})
                        .then(() => {
                            this.setState({added: [...this.state.added, this.state.itemName]}, () => console.log(this.state.added))
                            this.setState({itemName: ''})
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    default: 
                        console.log('Select a Valid Case')
                }
            }
            else{
                alert('You are not authorized for this action.')
            }
        })
    }
    removeItem(event, item, field){
        event.preventDefault()
        AxiosBaseFile.delete('/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data===true){
                switch(String(field)){
                    case 'education':
                        AxiosBaseFile.post('/api/db_delete_profile_education', {education: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'skill':
                        AxiosBaseFile.post('/api/db_delete_profile_skill', {skill: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'language':
                        AxiosBaseFile.post('/api/db_delete_profile_language', {language: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'interest':
                        AxiosBaseFile.post('/api/db_delete_profile_interest', {interest: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'hate':
                        AxiosBaseFile.post('/api/db_delete_profile_hate', {hate: item, username: localStorage.getItem('username')})
                        .then(() => {
                            window.location.reload(true);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    default: 
                        console.log('Select a Valid Case')
                }
            }
            else{
                alert('You are not authorized for this action.')
            }
        })
    }
    removeNewlyAddedItem(event, item, index, field){
        event.preventDefault()
        AxiosBaseFile.delete('/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data===true){
                switch(String(field)){
                    case 'education':
                        AxiosBaseFile.post('/api/db_delete_profile_education', {education: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'skill':
                        AxiosBaseFile.post('/api/db_delete_profile_skill', {skill: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'language':
                        AxiosBaseFile.post('/api/db_delete_profile_language', {language: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);  
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'interest':
                        AxiosBaseFile.post('/api/db_delete_profile_interest', {interest: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    case 'hate':
                        AxiosBaseFile.post('/api/db_delete_profile_hate', {hate: item, username: localStorage.getItem('username')})
                        .then(() => {
                            const added = this.state.added;
                            added.splice(index, 1);
                            this.setState(added);
                        })
                        .catch(err => alert('Some error occured, try again!'))
                        break;
                    default: 
                        console.log('Select a Valid Case')
                }
            }
            else{
                alert('You are not authorized for this action.')
            }
        })
    }
    search(event, field){
        this.setState({itemName: event.target.value});
        if (field === 'education'){
        document.getElementById('ErrorMessage').innerHTML='';
        AxiosBaseFile.post('/api/db_search_a_subject', {subject: event.target.value})
        .then(res => {
          this.setState({listOfItems: res.data}, () => console.log(this.state.listOfItems))
        })
        }
      }
    
    render() {
        const { textInfo } = this.props;
        const { field } = this.props;
        const { editMode } = this.props;
        var res = {};
        var array = [];
        for (var i = 0; i < textInfo.length; i++){
            res['text'] = textInfo[i];
            array[i] = JSON.parse(JSON.stringify(res));
        }
       
        // console.log(array)
        return(

            <>
                <div className="listed_educations_list" >
                    {array.map(
                        (texts, index) => 
                        <div key={index} className='colourTextListItems'>
                            <span>{texts.text}</span>
                            {editMode ? 
                                <BsXCircleFill 
                                    onClick={(event) => this.removeItem(event, texts.text, field)} 
                                    style={{color: 'rgb(142, 130, 151)', marginLeft: '4px', height: '0.8em'}}
                                /> 
                                :  
                                null
                            }
                        </div>
                    )}
                </div>

                    <div className='d-flex flex-wrap'>
                    {this.state.added.map(
                       (texts, index) => 
                       <div key={index} className='colourTextListItems'>
                            <span>{texts}</span>
                            {editMode ? <BsXCircleFill 
                                            onClick={(event) => this.removeNewlyAddedItem(event, texts, index, field)} 
                                            style={{color: 'rgb(142, 130, 151)', marginLeft: '4px', height: '0.8em'}} 
                                        /> 
                                      : 
                                        ''
                            }
                       </div> 
                    )}
                    </div>

                    <div className='d-flex editInterestsForm'>
                    {editMode ? 
                    <div className='mt-3'>
                        <input
                            list={field}
                            value={this.state.itemName}
                            onChange={(event) => this.search(event, field)}
                            className='selectFormColortext'
                        />
                        <button type="submit" className="addSubjectButtonQuestionaire" onClick={(event) => this.handleChange(event, field)}> <Add /> </button>
                            
                        <datalist id={field}>
                            {this.state.listOfItems.map((name) => (
                                <option key={name}
                                        value={name}
                                />
                            ))}
                        </datalist>
                            <p id='ErrorMessage'></p>
                    </div>: ''}
                    </div>
                </>
            )
        }
}
export default ColourText
