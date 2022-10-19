import React, { Component } from 'react';
import style from './leaderboard.module.css';
import Verses from '../../assets/versesImage.png';

class LeaderboardYouVsYou extends Component{
    render(){
        return(
            <>
            <div className={style.leaderboardHeader}>{localStorage.getItem('username')} <img src={Verses} alt="VS"/> {localStorage.getItem('username')}</div>
            <div>
                <table className={style.leaderboardTableContainer}>
                    <th>PERFORMANCE</th>
                    <th>POINTS</th>
                    <th>PRACTICE</th>
                    <th>QUIZZES</th>
                    <tr style={{backgroundColor:"#A78EC3", color:"white"}}> 
                        <td>Today</td><td>74</td><td>23</td><td>14</td>
                    </tr>
                    <tr> 
                        <td>Yesterday</td><td>66</td><td>38</td><td>4</td>
                    </tr>
                    <tr> 
                        <td>This Week</td><td>350</td><td>104</td><td>36</td>
                    </tr>
                    <tr> 
                        <td>Weekly Average</td><td>389</td><td>94</td><td>44</td>
                    </tr>
                    <tr>
                        <td>This Month</td><td>1538</td><td>345</td><td>131</td>
                    </tr>
                    <tr>
                        <td>Monthly Average</td><td>1204</td><td>322</td><td>129</td>
                    </tr>
                    </table>
            </div>
            </>
        );
    }
}
export default LeaderboardYouVsYou