import { Fragment, useEffect } from 'react';
import '../styles/Timeline.css'
import TimelineEntry from './TimelineEntry';

function Timeline({timelineEntries, deleteEntry, displayedGender, age, occupation}){
    let entriesPerDay = {}; // All timeline entries will be grouped by the day on which they occurred
    let visitedPlaces = []; // This will contain all the places visited

    for(let i = 0; i<timelineEntries.length; i++){
        if(timelineEntries[i].location!=""&& !visitedPlaces.includes(timelineEntries[i].location)) visitedPlaces.push(timelineEntries[i].location) // Including every different visited places, not allowing duplicates nor empty locations
        let entryDate = new Date(timelineEntries[i].timeFrom)
        let entryDay = entryDate.getFullYear() + '/' + (entryDate.getMonth()+1) +'/'+ entryDate.getDate() // This will give the day (YYYY/MM/DD) on which the entry occurred
        let alreadyIn = false
        let differentDays = Object.keys(entriesPerDay)
        for(let j=0; j<differentDays.length; j++){ // This loop allows to group entries per day by setting the alreadyIn value
            if(differentDays[j]==entryDay) alreadyIn=true;
        }
        if(!alreadyIn && entryDay!="NaN/NaN/NaN") entriesPerDay[entryDay]=[timelineEntries[i]] // If alreadyIn is false, it means the day is not already in the entriesPerDay variable so a new key is created
        else entriesPerDay[entryDay].push(timelineEntries[i]) // Else, the key corresponding to the day already exists thus the entry is simply added to the entries array of that dat
    }

    visitedPlaces.sort((a, b) => a.toUpperCase() > b.toUpperCase()); // Locations will be stored alphabetically regardless of them being uppercase or not


    let orderedDates = Object.keys(entriesPerDay).sort((a,b)=> (new Date(a)).getTime() - (new Date(b)).getTime()) // Getting all the different days on which an entry occurred and sorting them chonologically
    let orderedEntriesPerDay = {}; // This will contain an ordered version of entriesPerDay variable

    for(let i=0; i<orderedDates.length; i++){
        orderedEntriesPerDay[orderedDates[i]] = entriesPerDay[orderedDates[i]] // Sorting the days chronologically
    }

    for(const key of Object.keys(orderedEntriesPerDay)){
        orderedEntriesPerDay[key].sort((a,b) => new Date(a.timeFrom).getTime() - new Date(b.timeFrom).getTime()) // Sorting the activities within the days chronologically (7am before 8am)
    }

    return(
        <Fragment>
            <div className='timeline'>
                <div className='patientInformationDisplay'>
                    <div style={{fontSize:"1.5vh"}}>{displayedGender}</div>
                    <div style={{fontSize:"3vh"}}>{age} years old</div>
                    <div style={{fontSize:"1.5vh"}}>{occupation}</div>
                </div>
                {(Object.keys(orderedEntriesPerDay)).map((entriesOnThisDay)=>(
                    <div key={entriesOnThisDay} className='timelineEntryDay'>{entriesOnThisDay}
                    {entriesPerDay[entriesOnThisDay].map((timelineEntry)=>(
                        <TimelineEntry key={timelineEntry.key} timelineEntry={timelineEntry} deleteEntry={() => deleteEntry(timelineEntry.key)}/>
                    ))}
                    </div>
                ))}
                Visited Places
                <div className='visitedPlaces'>
                    {visitedPlaces.map((visitedPlace, index)=>(
                        <div className='visitedPlace' key={index}>
                            {visitedPlace}
                        </div>
                    ))}
                </div>
        </div>     
        </Fragment>
    )
}

export default Timeline;