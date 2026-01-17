import { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { SuggestionChips } from '@/components/chat/suggestion-chips';
import { ThemedView } from '@/components/themed-view';
import { trpc } from '@/lib/trpc';

export default function HomeScreen() {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();

  const { data: suggestionsData } = trpc.chat.getSuggestions.useQuery();

  const sendMessage = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      console.log('Response:', data.response);
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
      sendMessage.mutate({ message: message.trim() });
      setMessage('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
          keyboardShouldPersistTaps="handled">
          <ChatHeader title="Hello there!" subtitle="How can I help you today?" />
          <View style={styles.spacer} />
        </ScrollView>

        {suggestionsData?.suggestions && (
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  spacer: {
    flex: 1,
    minHeight: 100,
  },
});
