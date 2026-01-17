import { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Message } from '@/components/chat/chat-message';
import { SuggestionChips } from '@/components/chat/suggestion-chips';
import { ThemedView } from '@/components/themed-view';
import { trpc } from '@/lib/trpc';

export default function HomeScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const insets = useSafeAreaInsets();

  const { data: suggestionsData } = trpc.chat.getSuggestions.useQuery();

  const sendMessage = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: data.id,
        role: 'assistant',
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: (error) => {
      console.error('Error sending message:', error.message);
    },
  });

  const handleSuggestionPress = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleSend = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message.trim(),
      };
      setMessages((prev) => [...prev, userMessage]);
      sendMessage.mutate({ message: message.trim() });
      setMessage('');
    }
  };

  const hasMessages = messages.length > 0;

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
            <ChatMessages messages={messages} isThinking={sendMessage.isPending} />
          )}
        </View>

        {!hasMessages && suggestionsData?.suggestions && (
          <SuggestionChips
            suggestions={suggestionsData.suggestions}
            onSuggestionPress={handleSuggestionPress}
          />
        )}

        <ChatInput
          value={message}
          onChangeText={setMessage}
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
