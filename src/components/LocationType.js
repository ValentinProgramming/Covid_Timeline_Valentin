import '../styles/LocationType.css'

function LocationType({locationType, setLocationType}){ // Component used to display the location type choices in the location type selection
    return(
        <option value={locationType} onClick={() => setLocationType(locationType)}>
            {locationType}
        </option>)
}

export default LocationType;