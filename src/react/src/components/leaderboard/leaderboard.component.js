import React, { Component } from 'react';
import style from './leaderboard.module.css';

class LeaderboardYouVsYou extends Component{
    render(){
        return(
            <>
            <div className={style.leaderboardHeader}>Akshat VS Akshat</div>
            <div>
                <table>
                    <th>PERFORMANCE</th>
                    <th>POINTS</th>
                    <th>PRACTICE</th>
                    <th>QUIZZES</th>
                    <tr style={{backgroundColor:"#A78EC3", color:"white"}}> 
                        <td>Akshat Today</td><td>271</td><td>23</td><td>14</td>
                    </tr>
                    <tr> 
                        <td>Akshat Yesterday</td><td>271</td><td>23</td><td>14</td>
                    </tr><tr> 
                        <td>Akshat Sunday</td><td>271</td><td>23</td><td>14</td>
                    </tr><tr> 
                        <td>Akshat's Weekly Average</td><td>271</td><td>23</td><td>14</td>
                    </tr><tr> 
                        <td>Akshat's Monthly Average</td><td>271</td><td>23</td><td>14</td>
                    </tr>
                    </table>
            </div>
            </>
        );
    }
}
export default LeaderboardYouVsYou