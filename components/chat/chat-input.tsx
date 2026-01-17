import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onAttachPress?: () => void;
  modelName?: string;
}

const colors = Colors.dark;

export function ChatInput({
  value,
  onChangeText,
  onSend,
  onAttachPress,
  modelName = 'Gemini 2.5 Flash Lite',
}: ChatInputProps) {
  const insets = useSafeAreaInsets();
  const hasMessage = value.trim().length > 0;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          placeholderTextColor={colors.icon}
          value={value}
          onChangeText={onChangeText}
          multiline
          maxLength={4000}
        />
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onAttachPress}
            activeOpacity={0.7}>
            <IconSymbol name="paperclip" size={20} color={colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.modelSelector} activeOpacity={0.7}>
            <IconSymbol name="sparkles" size={16} color="#a855f7" />
            <ThemedText style={styles.modelText}>{modelName}</ThemedText>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: hasMessage ? colors.text : colors.icon },
            ]}
            onPress={onSend}
            activeOpacity={0.7}
            disabled={!hasMessage}>
            <IconSymbol name="arrow.up" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  inputWrapper: {
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  input: {
    fontSize: 16,
    minHeight: 24,
    maxHeight: 100,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  modelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  modelText: {
    fontSize: 13,
    opacity: 0.8,
  },
  spacer: {
    flex: 1,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
