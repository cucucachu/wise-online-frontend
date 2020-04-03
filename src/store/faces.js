import axios from 'axios';
import { submitConfidenceScore } from './axios';
import { baseURL, apiKey } from '../config/facesConfig';



const detectFacesEndpoint = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': apiKey
    },
    withCredentials: false,
    validateStatus: () => true,
});

const verifyFacesEndpoint = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
    },
    withCredentials: false,
    validateStatus: () => true,
});

async function uploadFace(image) {
    const response = await detectFacesEndpoint.post('/detect', image);

    return response.data.length ? response.data[0].faceId : false;
}

async function verifyFace(faceId1, faceId2) {
    const response = await verifyFacesEndpoint.post('/verify', { faceId1, faceId2 });
    return response.data.confidence;
}

async function uploadReferenceImage(image) {
    return uploadFace(image);
}

async function checkForStudent(testAttendanceId, referenceImageId, image) {
    const faceId2 = await uploadFace(image);
    const confidenceScore = faceId2 ? await verifyFace(referenceImageId, faceId2) : 0;

    return submitConfidenceScore(testAttendanceId, confidenceScore);
}

export { uploadReferenceImage, checkForStudent };