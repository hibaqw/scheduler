import React from "react";
import classNames from "classnames";
import "components/InterviewListItem.scss"

export default function InterviewListItem (props){
  let interviewerClassName = classNames({'interviewers__item': !(props.selected), 'interviewers__item--selected': props.selected});
  return (<li onClick={()=> props.setInterviewer(props.id)} className={interviewerClassName} selected={props.selected} >
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && <h3>{props.name}</h3>}
</li>);

}