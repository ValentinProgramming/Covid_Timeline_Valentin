import '../styles/Gender.css'

function Gender({gender, setGender}){ // Component used to display the gender choices in the gender selection
    return(
        <option value={gender} onClick={() => setGender(gender)}>
        {gender}
        </option>)
}

export default Gender;