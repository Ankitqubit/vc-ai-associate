"use client";

import { useState, useEffect, useRef } from "react";

interface UseSpeechRecognitionProps {
    onTranscript: (text: string) => void;
    continuous?: boolean;
    onEnd?: () => void; // Callback when speech recognition ends
}

export function useSpeechRecognition({ onTranscript, continuous = false, onEnd }: UseSpeechRecognitionProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Check if browser supports Web Speech API
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            setIsSupported(!!SpeechRecognition);

            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = continuous;
                recognition.interimResults = true;
                recognition.lang = "en-US";

                recognition.onresult = (event: any) => {
                    const transcript = Array.from(event.results)
                        .map((result: any) => result[0].transcript)
                        .join("");
                    onTranscript(transcript);
                };

                recognition.onerror = (event: any) => {
                    // "no-speech" is a common, non-critical error when user doesn't speak
                    // Just silently ignore it and let onend handle cleanup
                    if (event.error === "no-speech") {
                        console.log("No speech detected");
                        return;
                    }

                    // Only log actual errors
                    console.error("Speech recognition error:", event.error);
                    setError(event.error);
                    setIsListening(false);
                };

                recognition.onend = () => {
                    setIsListening(false);
                    if (onEnd) {
                        onEnd(); // Trigger callback when recognition ends (auto-silence detected)
                    }
                };

                recognitionRef.current = recognition;
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [continuous, onTranscript, onEnd]);

    const startListening = () => {
        if (recognitionRef.current && isSupported) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setError(null);
            } catch (err) {
                console.error("Error starting recognition:", err);
                setError("Failed to start listening");
            }
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return {
        isListening,
        isSupported,
        error,
        startListening,
        stopListening,
    };
}
