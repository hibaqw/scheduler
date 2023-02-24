import React from "react";
import classNames from "classnames";
export default function InterviewListItem (props){
  let interviewerClassName = classNames('interviewers__item', {'--selected': props.selected} );
  return (<li onClick={()=> props.setInterviewer(props.id)} className={interviewerClassName}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  Sylvia Palmer
</li>);

}