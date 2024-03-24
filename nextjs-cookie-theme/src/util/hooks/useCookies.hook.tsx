"use client";

import { useOnChange } from "./useOnChange.hook";
import { useTabState } from "./useTabState.hook";

export function useCookies<CookieType>(
    key: string,
    cookieValue: CookieType,
    debounceTime: number = 0
): [CookieType, React.Dispatch<React.SetStateAction<CookieType>>] {
    // Use broadcast instead of change in cookie since this is cooler
    const [value, setValue, isOrigin] = useTabState<CookieType>(
        cookieValue,
        key
    );

    useOnChange(() => {
        const delayDebounceFn = setTimeout(() => {
            try {
                if (!isOrigin) {
                    void fetch("/api/set-theme", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ value })
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }, debounceTime);

        return () => clearTimeout(delayDebounceFn);
    }, [value]);

    return [value, setValue];
}