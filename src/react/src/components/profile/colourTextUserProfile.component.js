import React, { Component } from 'react'
import './profile.css'
class ColourTextUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        const { textInfo } = this.props
        var res = {};
        var array = []
        for (var i = 0; i < textInfo.length; i++){
            res['text'] = textInfo[i];
            array[i] = JSON.parse(JSON.stringify(res));
        }
        // console.log(array)
        return(
                <div className="listed_educations_list" >
                    {array.map(
                        (texts, index) => 
                            <div key={index} className='colourTextListItems'>{texts.text}</div>
                    )}
                </div>
            )
        }
}
export default ColourTextUser
