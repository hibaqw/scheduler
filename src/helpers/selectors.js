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