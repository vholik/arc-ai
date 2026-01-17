import { Colors } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.dark
) {
  if (props.dark) {
    return props.dark;
  }
  return Colors.dark[colorName];
}
