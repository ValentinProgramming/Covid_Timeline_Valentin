import '../styles/TimelineEntry.css'

function TimelineEntry({timelineEntry, deleteEntry}){
    const timeFrom = new Date(timelineEntry.timeFrom)
    const timeFromHours = timeFrom.getHours()<10 ? "0"+timeFrom.getHours() : timeFrom.getHours();
    const timeFromMinutes = timeFrom.getMinutes()<10 ? "0"+timeFrom.getMinutes() : timeFrom.getMinutes();

    let locationString = timelineEntry.location ? timelineEntry.locationType+" - "+timelineEntry.location : timelineEntry.locationType

    return(
        <div className='timelineEntry'>
            <div className='period'>
                {timeFromHours+":"+timeFromMinutes} - {timelineEntry.timeTo}
            </div>
            <div className='detail_locationType'>
                <div className='detail'>
                    {timelineEntry.detail}
                </div>
                <div className='locationType'>
                    {locationString}
                    
                </div>
            </div>
            <button className='deleteTimeEntry' onClick={deleteEntry}>X</button>
        </div>
    )
}

export default TimelineEntry;