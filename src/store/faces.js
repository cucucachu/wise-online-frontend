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
    validateStatus: () => true,
});

const verifyFacesEndpoint = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
    },
    validateStatus: () => true,
});

async function uploadFace(image) {
    console.log('/uploadFace');    
    
    const response = await detectFacesEndpoint.post('/detect', image);
    console.log('   face uploaded with id ' + response.data[0].faceId);
    return response.data[0].faceId;
}

async function verifyFace(faceId1, faceId2) {
    console.log('/verifyFace');    
    const response = await verifyFacesEndpoint('/verify', { faceId1, faceId2 });
    console.log('   face verified: ' + response.data.confidence);

    return response.data.confidence;
}

async function uploadReferenceImage(image) {
    return uploadFace(image);
}

async function checkForStudent(testAttendanceId, referenceImageId, image) {
    console.log('/checkForStudent');    
    const faceId2 = await uploadFace(image);

    const confidenceScore = await verifyFace(referenceImageId, faceId2);
    
    return submitConfidenceScore(testAttendanceId, confidenceScore);
}

export { uploadReferenceImage, checkForStudent };