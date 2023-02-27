export function getAppointmentsForDay(state, name) {
  const filteredObj = state.days.filter(day => day.name === name);
  if (filteredObj.length === 0) {
    return [];
  }
  return filteredObj[0].appointments;


  
}