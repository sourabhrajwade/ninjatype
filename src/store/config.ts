import type { THEME } from "@/constants/themes";
import { persistentMap } from "@nanostores/persistent";
import { atom } from "nanostores";

export const $config = persistentMap<{
    theme: keyof typeof THEME;
    mode: "time" | "words";
    maxWordCount: string;
    countdownTime: string;
}>("config:", {
    theme: "amoled",
    mode : "time", // default is time
    maxWordCount: "25",
    countdownTime: "15s",
});

export const $isMounted = atom<boolean>(false);