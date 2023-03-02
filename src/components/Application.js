import React from "react";

import "components/Application.scss";
import { useState } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

function bookInterview(id, interview) {
  console.log(id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios
    .put(`/api/appointments/${id}`, {interview})
    .then((response) => {
        console.log(response);
        setState({...state, appointments});
    })
}

function cancelInterview(id){
  console.log(id);
  const delAppointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: delAppointment
  };
  return axios
    .delete(`/api/appointments/${id}`)
    .then((response) => {
        console.log(response);
        setState({...state, appointments});
    })

}
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state,state.day);

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
    }, []);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return <Appointment
            key={appointment.id}
            interview={interview}
            interviewers= {dailyInterviewers}
            {...appointment}
            bookInterview = {bookInterview}
            cancelInterview = {cancelInterview}
          />
        })}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
