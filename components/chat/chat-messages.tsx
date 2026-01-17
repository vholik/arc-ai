import { useRef, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { ChatMessage, Message } from './chat-message';
import { ThinkingIndicator } from './thinking-indicator';

interface ChatMessagesProps {
  messages: Message[];
  isThinking: boolean;
}

export function ChatMessages({ messages, isThinking }: ChatMessagesProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive or thinking state changes
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages.length, isThinking]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {messages.map((message, index) => (
        <ChatMessage key={message.id} message={message} index={index} />
      ))}
      {isThinking && <ThinkingIndicator />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 8,
  },
});
