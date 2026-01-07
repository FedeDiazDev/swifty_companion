import { Slot } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/context/AlertContext';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AlertProvider>
                <AuthProvider>
                    <Slot />
                </AuthProvider>
            </AlertProvider>
        </SafeAreaProvider>
    );
}
