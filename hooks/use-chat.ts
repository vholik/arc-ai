import Constants from "expo-constants";
import { useCallback, useRef, useState } from "react";
import { Platform } from "react-native";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface UseChatOptions {
  api?: string;
  onError?: (error: Error) => void;
  onFinish?: (message: Message) => void;
}

function getBaseUrl(): string {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (apiUrl) return apiUrl;

  if (Platform.OS === "web") return "";

  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const host = debuggerHost.split(":")[0];
    return `http://${host}:8081`;
  }

  return "http://localhost:8081";
}

export function useChat(options: UseChatOptions = {}) {
  const { api = "/api/chat", onError, onFinish } = options;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const append = useCallback(
    async (userMessage: Omit<Message, "id">) => {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: userMessage.role,
        content: userMessage.content,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message that will be streamed
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch(`${getBaseUrl()}${api}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          console.error("Error:", await response.json());
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let assistantContent = "";

        // Check if streaming is supported (web) or use fallback (native)
        if (response.body && typeof response.body.getReader === "function") {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            assistantContent += chunk;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          }
        } else {
          // Fallback for React Native - no streaming, get full response
          assistantContent = await response.text();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: assistantContent }
                : m
            )
          );
        }

        const finalMessage: Message = {
          id: assistantId,
          role: "assistant",
          content: assistantContent,
        };

        onFinish?.(finalMessage);
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }
        const error = err as Error;
        setError(error);
        onError?.(error);
        // Remove the empty assistant message on error
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [api, messages, onError, onFinish]
  );

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    append,
    stop,
    reset,
    setMessages,
  };
}
