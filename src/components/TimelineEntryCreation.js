import { Fragment } from 'react';
import '../styles/TimelineEntryCreation.css'
import LocationType from './LocationType';
import { useState } from 'react';
import Moment from 'moment'; // Will be used to check overlapping among time entries
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

function TimelineEntryCreation({timelineEntries, setTimelineEntries, timelineEntryKey, setTimelineEntryKey}){
    // States corresponding to the values that compose a timeline entry
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [detail, setDetail] = useState('')
    const [location, setLocation] = useState('');
    const [displayedLocationType, setLocationType] = useState("Indoor")

    const locationTypes = [
        "Indoor",
        "Outdoor",
        "Home",
        "Travelling"
    ] // Available location Types


    function updateTimelineEntries(timeFrom, timeTo, detail, displayedLocationType, location){ // Functions executed when creating a new time entry
        let timeFromDate = new Date(timeFrom) // Getting the timeFrom to a Date type
        let timeToValue = Number(timeTo.split(":")[0]*60)+Number(timeTo.split(":")[1])
        let timeFromValue = timeFromDate.getHours()*60 + timeFromDate.getMinutes()
        let range = moment.range(timeFromDate, new Date(timeFromDate.getFullYear(),
                                                        timeFromDate.getMonth(),
                                                        timeFromDate.getDate(),
                                                        Number(timeTo.split(":")[0]),
                                                        Number(timeTo.split(":")[1]))) // Creating the time period on which the time entry occurred (YYYY/MM/DD/HH/mm)
        if(detail!='' && timeFrom!='' && timeTo!=''){ // Making sure mandatory fields are correctly provided
            if(timeToValue>timeFromValue){ // Checking if the ending time of the entry is later than the starting time as it should be
                let timeCollapse = false; // Boolean which will be set to true if there is a period overlapping
                for(let i=0; i<timelineEntries.length;i++){ // For each existing time entry
                    let timelineFromDate = new Date(timelineEntries[i].timeFrom)
                    let timelineToDate = new Date(timelineFromDate.getFullYear(), 
                                                    timelineFromDate.getMonth(), 
                                                    timelineFromDate.getDate(),
                                                    Number(timelineEntries[i].timeTo.split(":")[0]),
                                                    Number(timelineEntries[i].timeTo.split(":")[1])) 
                    if(
                        (timelineFromDate.getFullYear()==timeFromDate.getFullYear())&&
                        (timelineFromDate.getMonth()==timeFromDate.getMonth())&&
                        (timelineFromDate.getDate()==timeFromDate.getDate())
                        ) // We first check if the activity occurs the same day than the activity to be created, as our application allows to create activities on a single day which makes it impossible for activities on different days to overlap
                        {
                            let rangeTimeLine = moment.range(timelineFromDate, timelineToDate) // If the activity occurs the same day than the activity to be created, we check if the activity periods are overlapping
                            if (range.overlaps(rangeTimeLine)) timeCollapse = true
                        }
                }
                if((displayedLocationType=="Outdoor" || displayedLocationType=="Indoor") && location==''){ // Making sure location is provided if location type is Outdoor or Indoor
                    alert('The location should be provided if the location type is "Outdoor" or "Indoor".')
                }
                else{
                    if(timeCollapse){ // Not allowing activity creation if overlapping
                        alert('Entry period should not overlap another entry period.')
                    }
                    else{ // If all conditions are respected, the timeline entry is created
                        setTimelineEntryKey(timelineEntryKey+1)
                        setTimelineEntries([...timelineEntries,
                        {timeFrom, timeTo, detail, locationType: displayedLocationType, location, key:timelineEntryKey}])
                    }
                }
            }
            else{
                alert("The starting time should be earlier than the ending time.")
            }
        }
        else{
            alert("An entry should contain a period, detail and location type.")
        }
    }

    return(
    <div className='timelineEntryCreation'>
        <div className='periodCreation'>
        <div className='timeFromCreation'>
            From
            <input
                type="datetime-local"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)} // e.target.value get the value entered in the field by the user
            />
        </div>
        <div className='timeToCreation'>
            To
            <input
                type="time"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
            />
        </div>
        </div>
        <div className='detailCreation'>
            Detail
            <textarea className='detailInput'
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}>
            </textarea>
        </div>
        <div className='locationType_location'>
            <div className='locationTypeCreation'>
                Location Type
                <select>
                    {locationTypes.map((locationType, index)=> (
                    <LocationType key={index} locationType={locationType} setLocationType={setLocationType}/>
                    ))}
                </select>
            </div>
            <div className='locationCreation'>
                Location Name
                <input
                    type="string"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
        </div>
        <button className='entryButton' onClick={() => updateTimelineEntries(timeFrom, timeTo, detail, displayedLocationType, location)}>+ Add Entry</button>
    </div>)
}

export default TimelineEntryCreation;