import lsAdapter from './lsAdapter';

export const credentials = {
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
    }
}