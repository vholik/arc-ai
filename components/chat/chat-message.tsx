import type { UIMessage } from '@ai-sdk/react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Markdown from 'react-native-markdown-display';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export type Message = UIMessage;

interface ChatMessageProps {
  message: Message;
  index: number;
}

const colors = Colors.dark;

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user';

  const textContent = message.parts
    ?.filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('');

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
        {isUser ? (
          <ThemedText style={[styles.text, styles.userText]}>
            {textContent}
          </ThemedText>
        ) : (
          <Markdown style={markdownStyles}>{textContent}</Markdown>
        )}
      </View>
    </Animated.View>
  );
}

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  heading1: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    marginTop: 12,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    marginTop: 8,
  },
  paragraph: {
    marginBottom: 8,
    marginTop: 0,
  },
  strong: {
    fontWeight: '700',
  },
  em: {
    fontStyle: 'italic',
  },
  link: {
    color: colors.tint,
    textDecorationLine: 'underline',
  },
  blockquote: {
    backgroundColor: colors.card,
    borderLeftWidth: 3,
    borderLeftColor: colors.tint,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
  },
  code_inline: {
    backgroundColor: colors.card,
    color: colors.tint,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  code_block: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  fence: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  list_item: {
    marginVertical: 4,
  },
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  bullet_list_icon: {
    color: colors.text,
    marginRight: 8,
  },
  ordered_list_icon: {
    color: colors.text,
    marginRight: 8,
  },
});

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
