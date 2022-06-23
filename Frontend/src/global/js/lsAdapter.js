import lsTest from './lsTest';

const lsAdapter = {
    get(key) {
        if (!lsTest()) {
            return null;
        }

        return localStorage.getItem(key);
    },
    set(ket, value) {
        if (!lsTest()) {
            return;
        }

        localStorage.setItem(ket, value);
    },
    remove(key) {
        if (!lsTest()) {
            return;
        }

        localStorage.removeItem(key);
    },
};

export default lsAdapter;
