import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: baseRESTURL,
});

axiosInstance.interceptors.request.use(req => {
    const token = authTokens.get();
    const sessionId = session.get();
    req.headers.authorization ??= `Bearer ${token?.authToken}`;
    req.headers.sessionId = sessionId;
    return req;
});

export default axiosInstance;