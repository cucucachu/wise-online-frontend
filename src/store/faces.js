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
    const response = await detectFacesEndpoint.post('/detect', image);

    return response.faceId;
}

async function verifyFace(faceId1, faceId2) {
    const response = await verifyFacesEndpoint('/verify', { faceId1, faceId2 });

    return response.confidence;
}

async function uploadReferenceImage(image) {
    return uploadFace(image);
}

async function checkForStudent(testAttendanceId, referenceImageId, image) {
    const faceId2 = await uploadFace(image);

    const confidenceScore = await verifyFace(referenceImageId, faceId2);
    
    return submitConfidenceScore(testAttendanceId, confidenceScore);
}

export { uploadReferenceImage, checkForStudent };