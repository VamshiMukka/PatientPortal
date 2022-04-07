import {React, useEffect, useState} from "react";
import * as service from "./Service";
import {useNavigate} from "react-router-dom";
import * as constants from "./Constants";

const PatientList = () => {
  const [patientDetailsData, setPatientDetailsData] = useState();
  
  let navigate = useNavigate();

  useEffect(() => {
    getAllPatientDetails();
  },[]);

  // Construct Get Patient details call and set result to the object
  const getAllPatientDetails = () => {

    const token = localStorage.getItem(constants.AuthorizationToken);
    const patientDetails = service.getPatientDetails(token);
     patientDetails.next().value?.then((resp)=>{
          setPatientDetailsData(resp);
    })
     .catch((e) => {
          return [];
     });
  };

  // Navigate to the patient details page upon click of patient
function getPatientDetailsById(patientId)
 {
   navigate(constants.PatientDetails, {state: { patientId: patientId}});
 }

 // render the patient list page
  return (
  patientDetailsData?.map((item) => {
    
  return (
        <div>
          <table>
              <tr>
                      <td>
                      <a href= "#" onClick={() => getPatientDetailsById(item.patientId)}>
                          {item.firstName} {item.lastName}
                          </a >
                      </td>
              </tr>
          </table>
      </div>
    )
  })
  )
}

export default PatientList;