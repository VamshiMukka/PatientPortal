import {React, useEffect, useState} from "react";
import * as service from './Service';
import {useNavigate, useLocation} from "react-router-dom";

const PatientDetails = (props) => {

  const [patientInformation, setPatientInformation] = useState();
  let navigate = useNavigate();
  let location = useLocation();

  console.log(props);

  useEffect(() => {
    patientDetailsById();
  },[]);

// Construct Get Patient details by Id call and set result to the object
  const patientDetailsById = () => {
    if(localStorage.getItem("token")===null)
    {
      navigate("/");
    }
    const token = localStorage.getItem("token");
    
    const patientDetails = service.getPatientDetailsById(location.state.patientId, token);
    console.log(patientDetails);
    patientDetails.next().value?.then((resp)=>{
      setPatientInformation(resp);
   })
    .catch((e) => {
         return [];
    });
 };

  // render the patientdetails page
return (
  patientInformation?.map((item) => {

     return (
        <div>
            <table>
                    <tr>First Name : {item.firstName}</tr>
                    <tr>Last Name : {item.lastName}</tr>
                    <tr>Gender : {item.gender}</tr>
                    <tr>Date Of Birth : {item.dateOfBirth}</tr>
                    <tr>AddressLine 1 : {item.addressLine1}</tr>
                    <tr>Address Line 2 :{item.addressLine2}</tr>
                    <tr>City : {item.city}</tr>
                    <tr>State : {item.state}</tr>
                    <tr>Postal Code : {item.postalCode}</tr>
  
            </table>
        </div>
    )
})
)

}

export default PatientDetails;
