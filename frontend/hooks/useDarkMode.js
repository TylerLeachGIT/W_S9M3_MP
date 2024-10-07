import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

    useEffect(() => {
        if (isDarkMode) {
        document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };
    return [isDarkMode, toggleDarkMode];
}