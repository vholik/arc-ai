import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { SuggestionChips } from '@/components/chat/suggestion-chips';
import { ThemedView } from '@/components/themed-view';
import { generateAPIUrl } from '@/lib/api';
import { trpc } from '@/lib/trpc';
import { fetch as expoFetch } from 'expo/fetch';

export default function HomeScreen() {
  const [inputMessage, setInputMessage] = useState('');
  const insets = useSafeAreaInsets();

  const { data: suggestionsData } = trpc.chat.getSuggestions.useQuery();


  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSuggestionPress = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      sendMessage({ text: inputMessage.trim() });
      setInputMessage('');
    }
  };

  const hasMessages = messages.length > 0;

  // Show thinking when loading and last message has no text content yet
  const lastMessage = messages[messages.length - 1];
  const lastMessageText = lastMessage?.parts?.find((p) => p.type === 'text');
  const isThinking = isLoading && hasMessages && !lastMessageText;

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={[styles.content, { paddingTop: insets.top + 8 }]}>
          {!hasMessages ? (
            <>
              <ChatHeader title="Hello there!" subtitle="How can I help you today?" />
              <View style={styles.spacer} />
            </>
          ) : (
            <ChatMessages
              messages={messages.filter((m) => m.parts?.some((p) => p.type === 'text' && p.text))}
              isThinking={isThinking}
            />
          )}
        </View>

        {!hasMessages && suggestionsData?.suggestions && (
          <SuggestionChips
            suggestions={suggestionsData.suggestions}
            onSuggestionPress={handleSuggestionPress}
          />
        )}

        <ChatInput
          value={inputMessage}
          onChangeText={setInputMessage}
          onSend={handleSend}
        />
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  spacer: {
    flex: 1,
    minHeight: 100,
  },
});
