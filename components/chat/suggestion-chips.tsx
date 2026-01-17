import { FlatList, Pressable, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionPress: (suggestion: string) => void;
}

const colors = Colors.dark;

export function SuggestionChips({
  suggestions,
  onSuggestionPress,
}: SuggestionChipsProps) {
  return (
    <FlatList
      data={suggestions}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      style={styles.list}
      contentContainerStyle={styles.container}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
          <Pressable
            style={styles.chip}
            onPress={() => onSuggestionPress(item)}
          >
            <ThemedText style={styles.text}>{item}</ThemedText>
          </Pressable>
        </Animated.View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    flexShrink: 0,
  },
  container: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  text: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
