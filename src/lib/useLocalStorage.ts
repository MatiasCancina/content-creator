import { useEffect, useState } from "react";
import { safeGetItem, safeSetItem, safeRemoveItem } from "./storage";

export default function useLocalStorage<T>(key: string, initialValue: T) {
    // Lee desde localStorage en el initial state solo si estamos en cliente.
    const [state, setState] = useState<T>(() => {
        try {
            if (typeof window === "undefined") return initialValue;
            const raw = safeGetItem(key);
            return raw !== null ? (JSON.parse(raw) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    // Sincroniza el valor con localStorage cuando cambia.
    useEffect(() => {
        try {
            if (state === null) {
                safeRemoveItem(key);
                return;
            }
            safeSetItem(key, JSON.stringify(state));
        } catch {
            // noop
        }
    }, [key, state]);

    return [state, setState] as const;
}