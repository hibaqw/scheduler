import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }
  function deleteAppt(){
    props.cancelInterview(props.id);
    transition(DELETING);
    if (mode === SHOW) {
      return;
    }
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  }

  function confirm(){
    transition(CONFIRM);
  }
  console.log("in appt: ", props.interview);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {confirm}
          onEdit = {() => transition(EDITING)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers = {props.interviewers}  onSave = {save} onCancel = { () => back(EMPTY)}/>
      )}
      {mode === SAVING && ( 
        <Status message = "Saving"/>
      )}
       {mode === DELETING && ( 
        <Status message = "Deleting"/>
      )}
     {mode === CONFIRM && ( 
        <Confirm onConfirm = {deleteAppt} onCancel = {() => back(SHOW)}/>
      )}
      {mode === EDITING && (
        <Form student={props.interview.student} interviewer={props.interview.interviewer} interviewers = {props.interviewers}  onSave = {save} onCancel = { () => back(SHOW)}/>
      )}
    </article>
  );
}