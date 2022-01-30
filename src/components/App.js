import logo from '../assets/logo.svg';
import '../styles/App.css';
import Patient from './Patient'
import { useEffect, useRef, useState } from 'react';
import PatientIcon from './PatientIcon';


function App() {
  // States will be used as shared variables with child components
  // Whenever a state value changes, the component as well as its children will be re-rendered which allows to get a dynamic application
  const [displayedPatient, setDisplayedPatient] = useState(1); // Displayedpatient variable will be continuously updated so that the right patient is being displayed
  const [patients, setPatients] = useState([]); 
  const [patientIcons, setPatientIcons] = useState([]);
  const [totalPatients, setTotalPatients] = useState(1); // This is the total number of patients created which will be continuously increased and never decrease (e.g., if patient 1 is deleted there will not be another patient 1)
  const stateRefPatients = useRef(); // References will take the value of the assigned variable, which makes it easier to use those vairable's values from within functions
  const stateRefPatientIcons = useRef();
  stateRefPatients.current = patients
  stateRefPatientIcons.current = patientIcons;

  
  function buttonClickAddPatient(){ // Adding a patient
    if(patients.length<8){
      setTotalPatients(totalPatients+1)
      setPatients(patients.concat(totalPatients))
      setPatientIcons(patientIcons.concat(totalPatients))
      setDisplayedPatient(totalPatients)
    }
  }

  const deletePatient = (patientNumberToDelete)=> { // Deleting a patient
    setPatients(stateRefPatients.current.filter((patient)=>patient!=patientNumberToDelete))
    setPatientIcons(stateRefPatientIcons.current.filter((patientIcon)=>patientIcon!=patientNumberToDelete))
  }

  return (
    <div className='window'>
    <div className="App">
      <h1>COVID Timeline Generator</h1>
      <div className='topBar'>
        {patientIcons.map((patientIcon)=>(
          <PatientIcon key={patientIcon} patientNumber={patientIcon} displayedPatient={displayedPatient} setDisplayedPatient={setDisplayedPatient}/>
        ))}
        <button className='addPatientButton' onClick={buttonClickAddPatient}>+</button>
      </div>
      {patients.map((patient)=>(
        <Patient key={patient} patientNumber={patient} displayedPatient={displayedPatient} setDisplayedPatient={setDisplayedPatient} deletePatient={()=>deletePatient(patient)}/>
      ))}
    </div>
    </div>
  );
}

export default App;
