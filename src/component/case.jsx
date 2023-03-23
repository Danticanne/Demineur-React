import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import './case.css'

export default function Case(props){
    let classname = (!props.show)?'case unrevealed' : 'case'
    return(
        <div className={classname} onClick={() => {props.onClick(props.X, props.Y)}}>
            {(props.bomb)?<FontAwesomeIcon icon={faBomb} />:<p>{(props.value==0)?" ":props.value}</p>}
        </div>
    )
}