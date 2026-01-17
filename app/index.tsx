import { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { SuggestionChips } from '@/components/chat/suggestion-chips';
import { ThemedView } from '@/components/themed-view';
import { useChat } from '@/hooks/use-chat';
import { trpc } from '@/lib/trpc';

export default function HomeScreen() {
  const [inputMessage, setInputMessage] = useState('');
  const insets = useSafeAreaInsets();

  const { data: suggestionsData } = trpc.chat.getSuggestions.useQuery();

  const { messages, isLoading, append } = useChat({
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  const handleSuggestionPress = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      append({
        role: 'user',
        content: inputMessage.trim(),
      });
      setInputMessage('');
    }
  };

  const hasMessages = messages.length > 0;

  // Show thinking when loading and last message is from user (no assistant response yet)
  const isThinking =
    isLoading && messages.length > 0 && messages[messages.length - 1]?.content === '';

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={[styles.content, { paddingTop: insets.top + 16 }]}>
          {!hasMessages ? (
            <>
              <ChatHeader title="Hello there!" subtitle="How can I help you today?" />
              <View style={styles.spacer} />
            </>
          ) : (
            <ChatMessages
              messages={messages.filter((m) => m.content !== '')}
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
    paddingHorizontal: 20,
  },
  spacer: {
    flex: 1,
    minHeight: 100,
  },
});
