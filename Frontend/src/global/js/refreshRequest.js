import { authTokens } from './authTokens';
import axiosInstance from './axiosConfig';

const refreshPromise = null;

const refreshRequest = {
    isPending: !!refreshPromise,
    send() {
        if (!this.isPending) {
            return refreshPromise;
        }

        this.isPending = true;

        const { refreshToken } = authTokens.get();
        authTokens.reset();

        return axiosInstance
            .post('/auth/refresh', null, {
                headers: {
                    authorization: `Bearer ${refreshToken}`,
                },
            })
            .then((res) => {
                const { authToken, expires } = res.data;
                authTokens.set(authToken, refreshToken, expires);
                this.isPending = false;
                return Promise.resolve(res);
            })
            .catch((err) => {
                this.isPending = false;
                return Promise.reject(err);
            });
    },
};

export default refreshRequest;
