
export const saveLocalStorageState = (state: object) => {
    Object.entries(state).forEach(([key, value]) => {
        if (value) {
            localStorage.setItem(key, value);
        }
        else if (!value && localStorage.getItem(key)) {
            localStorage.removeItem(key);
        }
    })
}
