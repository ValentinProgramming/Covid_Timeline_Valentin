import '../styles/PatientInformation.css'
import Gender from './Gender';
import { Fragment, useState } from 'react'


function PatientInformation({displayedGender, setGender, age, setAge, occupation, setOccupation, deletePatient}) {
    const genders = ["Male", "Female", "Decline to state"];


    function ageChange(e) { // Making sure the entered age is an integer
        if(Number.isInteger(Number(e))){
            setAge(e)
        }
        else{
            alert("Your age should be an Integer")
        }
    }

    return(
        <Fragment>
        <div className='patientInformation_deletePatientButton'>
            <h2>Patient Information</h2>
            <button className='deletePatientButton' onClick={deletePatient}>Remove Patient</button>
        </div>
        <div className='patientInformation'>
            <div className='gender'>
            Gender
            <select defaultValue={displayedGender}>
                {genders.map((gender, index)=> (
                <Gender key={index} gender={gender} setGender={setGender}/>
                ))}
            </select>
            </div>
            <div className='age'>
            Age
            <input
                value={age}
                onChange={(e) => ageChange(e.target.value)}
            />
            </div>
            <div className='occupation'>
            Occupation
            <input
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
            />
            </div>
        </div>
        </Fragment>
    )
}

export default PatientInformation;