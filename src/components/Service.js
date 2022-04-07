import axios from 'axios';
import serviceLocator from './Headers';
import * as constants from './Constants';


// Make a service call to get the patient details
export function* getPatientDetails(token) {
    yield axios
        .get(constants.GetAllPatientDetailsUrl, {
            headers: { ...serviceLocator.Headers, Authorization: constants.Bearer + token },
            data: {}
        })
        .then(({ data }) => {
            console.log(data)
            return data.success;
        })
        .catch((err) => err);
}

// Make a service call to get the patient details based on patientId
export function* getPatientDetailsById(patientId, authtoken) {

    yield axios
    .get(constants.PatientDetailsByIdUrl + patientId, {
        headers: { ...serviceLocator.Headers, Authorization: constants.Bearer + authtoken },
        data: {}
    })
    .then(({ data }) => {

        return data.success;
    })
    .catch((err) => err);
}

