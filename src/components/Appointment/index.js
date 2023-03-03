import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Error from './Error';
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
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }
  function deleteAppt(){
    props.cancelInterview(props.id);
    transition(DELETING, true);
    if (mode === SHOW) {
      return;
    }
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE,true));
  }

  function confirm(){
    transition(CONFIRM);
  }``
  return (
    <article className="appointment" data-testid="appointment">
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
        <Confirm onConfirm = {deleteAppt} message = "Are you sure you want to delete?" onCancel = {() => back(SHOW)}/>
      )}
      {mode === EDITING && (
        <Form student={props.interview.student} interviewer={props.interview.interviewer} interviewers = {props.interviewers}  onSave = {save} onCancel = { () => back(SHOW)}/>
      )}
       {mode === ERROR_SAVE && (
        <Error message ="Could not save appointment" onClose = {() => back(CREATE)}/>
      )}
      {mode === ERROR_DELETE && (
        <Error message ="Could not cancel appointment" onClose = {() => back(SHOW)}/>
      )}
    </article>
  );
}