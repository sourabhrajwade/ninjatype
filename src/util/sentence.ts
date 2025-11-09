import type { FetchWordListType } from "@/store/fetcher";

export const createSentenceFromWords = (
    fetchedWords: FetchWordListType | null,
    maxWords: number
): string => {
    if (!fetchedWords || fetchedWords.length === 0) {
        return "";
    }
    if( fetchedWords.type !== "wordlist") {
        return "";
    }
    let sentence = "";
    let wordCount = 0;

    while(wordCount < maxWords) {
        const randomIndex = Math.floor(Math.random() * fetchedWords.words.length);
        sentence += fetchedWords.words[randomIndex] + " ";
        wordCount = sentence.trim().split(" ").length;
    }

    if( wordCount > maxWords ) {
        const wordsArray = sentence.trim().split(" ");
        sentence = wordsArray.slice(0, maxWords).join(" ");
    }

    return sentence.trim();
};

export const createSentenceFromQuotes = (
    fetchedQuotes: FetchWordListType | null): string => {
    if (!fetchedQuotes || fetchedQuotes.length === 0) {
        return "";
    }
    if( fetchedQuotes.type !== "quotelist") {
        return "";
    }
    const randomIndex = Math.floor(Math.random() * fetchedQuotes.quotes.length);
    return fetchedQuotes.quotes[randomIndex].quote;
};

export const genOneWord = (fetchedWords: FetchWordListType | null): string => {
    if (!fetchedWords || fetchedWords.length === 0) {
        return "";
    }
    if( fetchedWords.type !== "wordlist") {
        return "";
    }
    const randomIndex = Math.floor(Math.random() * fetchedWords.words.length);
    return fetchedWords.words[randomIndex];
}