import React, { Component } from 'react'
import styles from './dashboardCalendar.module.css'
import Card from 'react-bootstrap/Card'
import Calendar, { MonthView } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import LeaderboardYouVsYou from '../leaderboard/leaderboard.component.js';
import TodoComponent from '../todo/todo.component.js';
import DiaryComponent from "../diary/diary.component.js";
import TaskComponent from "../task/task.component.js";
import axios from 'axios';

import CalenderImg from '../../assets/calendar.png';
import AssignmentsImg from '../../assets/assignment.png';
import TodoImg from '../../assets/todo.png';
import LeaderboardImg from '../../assets/leaderboard.png';
import CalenderLogImg from '../../assets/log list.png';
import { Button, Tooltip } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

let vals;

function compare(a, b) {
	if (parseInt(a.start_time, 10) < parseInt(b.start_time, 10)) return -1;
	if (parseInt(a.start_time, 10) > parseInt(b.start_time, 10)) return 1;
	return 0;
}

const EventItem = ({ eventType, eventName, eventTime }) => {

	let start = parseInt(eventTime);
	let str;

	if (start == 1) {
		str = "8 AM";
	} else if (start == 2) {
		str = "9 AM";
	} else if (start == 3) {
		str = "10 AM";
	} else if (start == 4) {
		str = "11 AM";
	} else if (start == 5) {
		str = "12 PM";
	} else if (start == 6) {
		str = "1 PM";
	} else if (start == 7) {
		str = "2 PM";
	} else if (start == 8) {
		str = "3 PM";
	} else if (start == 9) {
		str = "4 PM";
	} else if (start == 10) {
		str = "5 PM";
	} else if (start == 11) {
		str = "6 PM";
	} else if (start == 12) {
		str = "7 PM";
	} else if (start == 13) {
		str = "8 PM"
	}

	if (eventType == "Workshop") {
		return (
			<button type="button" class="btn btn-dark event-subheading text-left mt-1">{str} | Workshop-{eventName}</button>
		)
	} else if (eventType == "Meeting") {
		return (
			<button type="button" class="btn btn-warning event-subheading text-left mt-1">{str} | Meeting-{eventName}</button>
		)
	} else if (eventType == "Study") {
		return (
			<button type="button" class="btn btn-primary event-subheading text-left mt-1">{str} | Study-{eventName}</button>
		)
	} else if (eventType == "Class") {
		return (
			<button type="button" class="btn btn-info event-subheading text-left mt-1">{str} | Class-{eventName}</button>
		)
	}
}

class DashboardCalendarComponent extends Component {
	constructor(props){
		super(props);
		this.state={
			redirectTodo: false,
			redirectLeaderboard: false,
			date: new Date(),
			selectedDay: String,
			email: String,
		}
	}


	componentDidMount() {
		axios.post('http://127.0.0.1:8103/api/db_get_user_email', { 'username': localStorage.getItem('username') })
			.then(res => {
				this.setState({email: res.data}, () => window.localStorage.setItem('email', this.state.email))
			});
	}

	buildEvents(events) {
		console.log(events);
		if (events != null) {
			events = events.sort(compare);
			return (
				events.map(
					(event) =>
						<EventItem
							eventType={event.event_type}
							eventName={event.name}
							eventTime={event.start_time}
						/>
				)
			)
		} else {
			return (
				<button type="button" class="btn btn-secondary event-subheading text-left mt-1">No events</button>
			)
		}
	}

	clickDay(date) {
		window.localStorage.setItem('date', date.toDateString());
		this.state.selectedDay = (date.getFullYear() + ", " + date.getMonth() + ", " + date.getDate()).toString();
		console.log(this.state.selectedDay);
		axios.put('http://127.0.0.1:8103/api/db_get_schedule', { 'date': this.state.selectedDay, 'email': this.state.email })
			.then(res => {
				window.localStorage.setItem('events', JSON.stringify(res.data));
				vals = JSON.parse(window.localStorage.getItem('events'));
			})
			.catch((error) => {
				vals = null;
				window.localStorage.setItem('events', null);
			});
	}

	onChange = date => this.setState({ date })

	displayDashMenu(dashMenu){
        for (let x=1; x<=5; x++){
            var dashMenuId= 'dashMenu'+String(x);
            if (dashMenuId == dashMenu){
                document.getElementById(dashMenu).style.display="block";
            }
            else{
                document.getElementById(dashMenuId).style.display="none";
            }
        }
    }


	render() {
		if (this.state.redirectTodo){
			return <Redirect to="/todolist" />
		}
		if (this.state.redirectTodo){
			return <Redirect to="/leaderboard" />
		}

		const { value } = this.state;

		return (
			<>
			<div className={styles.dashCard4Style}>
				<div className={styles.windowHiddenHeader}>
				<Tooltip title ="Calendar"><Button className={styles.dashCardMenu} onClick={() => this.displayDashMenu("dashMenu1")}> <img src={CalenderImg} alt='not found' /> </Button></Tooltip>
				<Tooltip title ="Diary"><Button className={styles.dashCardMenu} onClick={() => this.displayDashMenu("dashMenu2")}><img src={CalenderLogImg} alt='not found' /> </Button></Tooltip>
				<Tooltip title ="Assignments"><Button className={styles.dashCardMenu} onClick={() => this.displayDashMenu("dashMenu3")}><img src={AssignmentsImg} alt='not found'/> </Button></Tooltip>
				<Tooltip title ="Todo List"><Button className={styles.dashCardMenu} onDoubleClick={() => this.setState({redirectTodo: true})} onClick={() => this.displayDashMenu("dashMenu4")}><img src={TodoImg} alt='not found'/> </Button></Tooltip>
				<Tooltip title ="Leaderboard"><Button className={styles.dashCardMenu} onDoubleClick={() => this.setState({redirectLeaderboard: true})} onClick={() => this.displayDashMenu("dashMenu5")}><img src={LeaderboardImg} alt='not found'/> </Button></Tooltip>
				
				</div>

				<div>
				    		<div className={styles.windowHidden} id="dashMenu1">
								<Calendar
									className={styles.reactCalendar}
									onChange={this.onChange}
									value={value}
									locale={'en-US'}
									returnValue={"start"}
									maxDetail={"month"}
									minDetail={"year"}
									calendarType={"US"}
									showDoubleView={false}
									onClickDay={this.clickDay(this.state.date)}
								/>
							</div>
							<div className={styles.windowHidden} id="dashMenu2">
								<DiaryComponent/>
							</div>
							<div className={styles.windowHidden} id="dashMenu3">
								<TaskComponent />
							</div>
							<div className={styles.windowHidden} id="dashMenu4">
								<TodoComponent />
							</div>
							<div className={styles.windowHidden} id="dashMenu5">
								<LeaderboardYouVsYou />
							</div>
				</div>
			</div>
			</>
		);
	}
}

export default DashboardCalendarComponent