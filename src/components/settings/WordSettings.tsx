import { WORD_TYPES } from "@/constants/wordTypes";
import { $config } from "@/store/config";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

const WordSettings = () => {
    const { dictionary: storedDictionary } = useStore($config);
    const [dictionary, setDictionary] = useState<typeof storedDictionary | null>(null);

    useEffect(() => {
        setDictionary(storedDictionary);
    }, [storedDictionary]);

    const handleWordTypeChange = (newType: keyof typeof WORD_TYPES) => {
        $config.setKey("dictionary", newType);
    };

    return (<div id="word-settings">
        {Object.keys(WORD_TYPES).map((key) => {
            const value = WORD_TYPES[key as keyof typeof WORD_TYPES];
            return <button key={key} data-is-selected={dictionary === key ? 1 : 0} className="btn large-btn" onClick={() => handleWordTypeChange(key as keyof typeof WORD_TYPES)}>{value.label}</button>
        })}
    </div>);
}

export default WordSettings;