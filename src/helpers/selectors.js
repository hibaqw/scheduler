export function getAppointmentsForDay(state, name) {
  const filteredObj = state.days.filter(day => day.name === name);
  if (filteredObj.length === 0) {
    return [];
  }
  // return filteredObj[0].appointments;
  const getAppointments = filteredObj[0].appointments.map((appointment) => {
    console.log(state.appointments[appointment]);
    return state.appointments[appointment];
  })
  return getAppointments;
}
export function getInterviewersForDay(state, name) {
  const filteredObj = state.days.filter(day => day.name === name);
  if (filteredObj.length === 0) {
    return [];
  }
  const getInterviewers = filteredObj[0].interviewers.map((interviewer) => {
    console.log(state.interviewers[interviewer]["name"]);
    return state.interviewers[interviewer];
  })
  console.log(getInterviewers);
  return getInterviewers;
}
export function getInterview(state, interview) {
  if (!interview){
    return null;
  }
  console.log("new log: ",{...interview, interviewer : {...state.interviewers[interview.interviewer]}} );
  return {...interview, interviewer : {...state.interviewers[interview.interviewer]}};
}