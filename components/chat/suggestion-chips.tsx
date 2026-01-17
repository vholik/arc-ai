import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionPress: (suggestion: string) => void;
}

const colors = Colors.dark;

export function SuggestionChips({ suggestions, onSuggestionPress }: SuggestionChipsProps) {
  return (
    <FlatList
      data={suggestions}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chip}
          onPress={() => onSuggestionPress(item)}
          activeOpacity={0.7}>
          <ThemedText style={styles.text}>{item}</ThemedText>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 8,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
  },
});
