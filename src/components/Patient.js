import '../styles/Patient.css'
import PatientInformation from './PatientInformation';
import TimelineEntryCreation from './TimelineEntryCreation';
import { useEffect, useRef, useState } from 'react';
import Timeline from './Timeline';

function Patient({patientNumber, displayedPatient, setDisplayedPatient, deletePatient}) {
    const [displayedGender, setGender] = useState('Male'); // Male is default value
    const [age, setAge] = useState('22'); // 22 is default value
    const [occupation, setOccupation] = useState(''); // Empty by default
    const [timelineEntries, setTimelineEntries] = useState([]); // Timeline entries will be assigned to the corresponding patient
    const [timelineEntryKey, setTimelineEntryKey] = useState(1);
    const stateRefEntries = useRef();
    stateRefEntries.current = timelineEntries;

    const deleteEntry = (entryToDelete)=> {
      setTimelineEntries(stateRefEntries.current.filter((timelineEntry)=>timelineEntry.key!=entryToDelete))
    }
  

    return patientNumber==displayedPatient && ( 
      // The patient will be displayed only if it is the patient that should be displayed
      <div className='patient'>
        <PatientInformation className='patientInformation' displayedGender={displayedGender} setGender={setGender} age={age} setAge={setAge} occupation={occupation} setOccupation={setOccupation} deletePatient={deletePatient}/>
        <h2>Timeline</h2>
        <div className='timelinePart'>
          <Timeline className='timeline' timelineEntries={timelineEntries} deleteEntry={deleteEntry} displayedGender={displayedGender} age={age} occupation={occupation}/>
          <TimelineEntryCreation className='timelineEntryCreation' timelineEntries={timelineEntries} setTimelineEntries={setTimelineEntries} timelineEntryKey={timelineEntryKey} setTimelineEntryKey={setTimelineEntryKey}/>
        </div>
      </div>
    ) 
  }

export default Patient;