import {useEffect, useState} from "react";

const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const useKonamiCode = (callbackFn: () => void) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const keyHandler = (event: KeyboardEvent) => {
            setCurrent((prevState) => {
                if (event.key !== pattern[prevState]) {
                    return 0;
                }

                const updatedState = prevState + 1;
                if (pattern.length === updatedState) {
                    callbackFn();
                    return 0;
                }
                return updatedState;
            });
        };

        document.addEventListener('keydown', keyHandler, false);

        return () => {
            document.removeEventListener('keydown', keyHandler);
        };
    }, [setCurrent]);
}