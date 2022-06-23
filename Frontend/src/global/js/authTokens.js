import day from 'dayjs';
import jwtDecode from 'jwt-decode';
import lsAdapter from './lsAdapter';

const authTokens = {
    get() {
        const authToken = lsAdapter.get('authTokens');
        const refreshToken = lsAdapter.get('refreshToken');

        let decodedToken;
        try {
            decodedToken = jwtDecode(refreshToken);
        } catch {
            return null;
        }

        const { exp } = decodedToken;
        const expires = day.unix(exp);

        if (authToken && expires) {
            return {
                authToken,
                expires,
            };
        }

        return null;
    },
    set(authToken, refreshToken) {
        lsAdapter.set('authToken', authToken);
        lsAdapter.set('refreshToken', refreshToken);
    },
    reset() {
        lsAdapter.remove('authToken');
        lsAdapter.remove('refreshToken');
    },
    exists() {
        return !!this.get();
    },
    valid() {
        if (!this.exists()) {
            return false;
        }

        const refreshToken = lsAdapter.get('refreshToken');
        const { exp } = jwtDecode(refreshToken);
        const expireDate = day.unix(exp);

        return day().isBefore(day(expireDate));
    },
};

export default authTokens;
