import { useEffect, useState } from 'react'
import '../styles/PatientIcon.css'

function PatientIcon({patientNumber, displayedPatient, setDisplayedPatient}){
    // Following states are used to make the visual of the patient icon change when the user clicks on it
    const[color, setColor] = useState("#254870");
    const[bottomBorder, setBottomBorder] = useState('')
    
    function patientIconClick(){
        setDisplayedPatient(patientNumber)
    }

    useEffect(()=>{ // Effect allows to execute an action on the change of value of a variable
        if(displayedPatient==patientNumber){
            setColor("#ffc107")
            setBottomBorder("none")
        }
        else {
            setColor("#254870")
            setBottomBorder("solid")
        }
      }, [displayedPatient]) // Color & bottom border will be changed whenever the displayedPatient variable is updated
    
    return(
        <div style={{color: color, borderBottom: bottomBorder}} className='patientIcon' onClick={()=>patientIconClick()}>
            <div>Patient</div>
            <div>{patientNumber}</div>
        </div>
    )
}

export default PatientIcon;