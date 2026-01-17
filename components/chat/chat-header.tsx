import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface ChatHeaderProps {
  title: string;
  subtitle: string;
}

export function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <View style={styles.header}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    opacity: 0.6,
  },
});
