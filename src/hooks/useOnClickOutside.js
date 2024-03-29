import { useEffect } from 'react'

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            } else {
                handler();
            }
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useOnClickOutside