import { THEME } from "@/constants/themes";
import { QUOTE_TYPES, WORD_TYPES } from "@/constants/wordTypes";
import { persistentMap } from "@nanostores/persistent";
import { atom, effect } from "nanostores";
import { z } from "zod";

// Zod schema for config validation
export const configSchema = z.object({
    theme: z.enum(Object.keys(THEME) as [keyof typeof THEME, ...Array<keyof typeof THEME>]),
    mode: z.enum(["time", "words", "quotes"]),
    maxWordCount: z.string().regex(/^\d+$/, "Must be a numeric string"),
    countdownTime: z.string().regex(/^\d+(s|m|h)$/, "Must be a time string like '15s'"),
    dictionary: z.enum(Object.keys(WORD_TYPES) as [keyof typeof WORD_TYPES, ...Array<keyof typeof WORD_TYPES>]),
    quotes: z.enum(Object.keys(QUOTE_TYPES) as [keyof typeof QUOTE_TYPES, ...Array<keyof typeof QUOTE_TYPES>]),
});

export type Config = z.infer<typeof configSchema>;

export const defaultConfig: Config = {
    theme: "amoled",
    mode: "time", // default is time
    maxWordCount: "25",
    countdownTime: "15s",
    dictionary: "1k", // default dictionary source
    quotes: "motivational-quotes", // default quotes source
};

export const $config = persistentMap<Config>(
    "config:",
    defaultConfig
);

effect([$config], (config) => {
    if (typeof window === "undefined") return;
    
    // Validate config with Zod
    const result = configSchema.safeParse(config);
    
    if (!result.success) {
        // Log validation errors for debugging
        console.warn("Invalid config detected:", result.error.flatten());
        // Reset to default config
        $config.set(defaultConfig);
        return;
    }
    
    // Additional check for any missing keys (in case of app update)
    const defaultKeys = Object.keys(defaultConfig).sort();
    const configKeys = Object.keys(config).sort();
    
    if (JSON.stringify(defaultKeys) !== JSON.stringify(configKeys)) {
        console.warn("Config keys mismatch. Resetting to default.");
        $config.set(defaultConfig);
    }
});

export const $isMounted = atom<boolean>(false);
