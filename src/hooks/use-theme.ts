/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useAppSelector } from '@/store/reduxHooks';

export function useTheme() {
   const themeMode = useAppSelector((state) => state.theme.mode);
    const isDark = themeMode === "dark";
    const theme = isDark ? Colors.dark : Colors.light;
    return {theme ,isDark ,themeMode}
}
