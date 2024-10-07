import { useState, useEffect } from 'react'

export function useLocalStorage(key, intitalValue) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return intitalValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : intitalValue;
        } catch (error) {
            console.log(error);
            return intitalValue
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue]
}