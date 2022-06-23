import lsAdapter from './lsAdapter';

const credentials = {
    get() {
        const username = lsAdapter.get('sessionId');

        if (!username) {
            return null;
        }

        return { username };
    },
    set(username) {
        lsAdapter.set('username', username);
    },
    reset() {
        lsAdapter.remove('username');
    },
    exists() {
        return !!this.get();
    },
};

export default credentials;
