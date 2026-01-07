/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2563eb'; // Azul vibrante
const tintColorDark = '#00babc';  // Cyan clásico de 42

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8fafc', // Slate 50
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#0f172a', // Slate 900 (El fondo principal de tu app)
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  
  // --- AÑADIDOS PARA SWIFTY COMPANION ---
  ui: {
    card: '#1e293b',       // Slate 800: Fondo de tarjetas (Wallet, Recent Searches)
    input: '#334155',      // Slate 700: Fondo del buscador
    border: '#334155',     // Bordes sutiles
    
    // Estados de Proyectos (Imagen 2)
    success: '#22c55e',    // Verde (Validation / 100%)
    successBg: 'rgba(34, 197, 94, 0.1)', // Fondo sutil verde
    failure: '#ef4444',    // Rojo (Fail)
    failureBg: 'rgba(239, 68, 68, 0.1)', // Fondo sutil rojo
    warning: '#f59e0b',    // Amarillo (Waitlist / In progress)
    textSecondary: '#94a3b8', // Texto gris claro (fechas, subtítulos)
  },
  
  // Barras de Habilidades (Imagen 2)
  skills: {
    algo: '#8b5cf6',       // Violeta
    unix: '#3b82f6',       // Azul
    graphics: '#2dd4bf',   // Turquesa
    web: '#f97316',        // Naranja
  }
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});