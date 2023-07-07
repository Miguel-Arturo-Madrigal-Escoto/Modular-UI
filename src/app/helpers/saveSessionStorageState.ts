
export const saveSessionStorageState = (state: object) => {
    Object.entries(state).forEach(([key, value]) => {
        if (value) {
            sessionStorage.setItem(key, value);
        }
        else if (!value && localStorage.getItem(key)) {
            sessionStorage.removeItem(key);
        }
    })
}
