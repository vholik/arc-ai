import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

const colors = Colors.dark;

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <Animated.View
      entering={FadeIn.delay(index * 50).duration(300)}
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.assistantContainer,
      ]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <IconSymbol name="sparkles" size={14} color={colors.text} />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}>
        <ThemedText style={[styles.text, isUser && styles.userText]}>
          {message.content}
        </ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 4,
    flexDirection: 'row',
    gap: 10,
  },
  userContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '85%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: colors.card,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  userText: {
    color: '#FFFFFF',
  },
});
