import axios from 'axios';
import { RESTUrl } from './config';
import authTokens from './authTokens';
import { session } from './session';

const axiosInstance = axios.create({
    baseURL: RESTUrl,
});

axiosInstance.interceptors.request.use((req) => {
    const token = authTokens.get();
    const sessionId = session.get();
    req.headers.authorization ??= `Bearer ${token?.authToken}`;
    req.headers.sessionId = sessionId;
    return req;
});

export default axiosInstance;
