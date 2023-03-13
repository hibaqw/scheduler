import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";


export default function DayListItem(props) {
  const dayListItemClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0 }); 
  const FormatSpots = ()=> {
    let spotStr = '';
    if (props.spots === 0){
      spotStr += 'no spots remaining';
    }
    else if (props.spots === 1){
      spotStr +=`${props.spots} spot remaining`;
    }
    else {
      spotStr +=`${props.spots} spots remaining` 
    }
    return spotStr;
  }
  return (
    <li onClick={()=> props.setDay(props.name)} className={dayListItemClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light"> <FormatSpots/></h3>
    </li>
  );
}