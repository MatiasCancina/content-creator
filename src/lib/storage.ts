export const isLocalStorageEnabled = (): boolean => {
    if (typeof window === "undefined") return false;
    if (process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE === "false") return false;
    try {
        const testKey = "__test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
};

export const safeSetItem = (key: string, value: string) => {
    if (!isLocalStorageEnabled()) return;
    try {
        localStorage.setItem(key, value);
    } catch { }
};

export const safeGetItem = (key: string): string | null => {
    if (!isLocalStorageEnabled()) return null;
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

export const safeRemoveItem = (key: string) => {
    if (!isLocalStorageEnabled()) return;
    try {
        localStorage.removeItem(key);
    } catch { }
};