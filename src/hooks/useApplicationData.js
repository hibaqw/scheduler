import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview, editing= false) {
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
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
       
        if (!editing){
          const days = updateSpots(id, true);
          setState({ ...state, appointments, days });
          return;

        }
        setState({ ...state, appointments });
      })
  }

  function cancelInterview(id) {
  
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
        console.log("in state: ", state.days)
        const days = updateSpots(id);
        setState({ ...state, appointments, days });

      })

  }

  function updateSpots(id, delSpot= false) {
    /**
     * 1. iterate thru state.days.appointments to find appointment id
     * 2. check if state.appointments.appointment is null or not
     * 3. or pass optional arguement true === add spot false== remove spot
     * 4. update state.days.day.spots 
     */
    let dayId = undefined;
   
    Object.keys(state.days).forEach((key) => {
      const dailyAppointments = state.days[key].appointments;
      if (dailyAppointments.includes(id)) {
        dayId = state.days[key].id;
      }
    });
    const day = state.days[dayId - 1];
    let spots = day.spots
    if (delSpot) {
      spots--;
    }
    else {
      spots++;
    }
    const newDaysArr= state.days.map(d => {
      return d.name === day.name? {...day,spots}: d
    })
    return newDaysArr;
  }
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview, updateSpots }
}