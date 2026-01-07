import CustomButton from '@/components/common/CustomButton';
import LoginHeader from '@/components/login/LoginHeader';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { intraEndpoints, redirectUri, clientId } from '@/services/authService';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
    const { signIn, isLoading } = useAuth();

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientId!,
            scopes: ['public'],
            redirectUri: redirectUri,
        },
        intraEndpoints
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            signIn(code);
        }
    }, [response]);

    return (
        <LinearGradient
            colors={['#0f172a', '#1e293b']}
            className="flex-1 justify-center items-center h-full px-8"
        >
            <LoginHeader />
            <View className="w-full">
                <CustomButton
                    title="Log in with 42"
                    handlePress={() => promptAsync()}
                    isLoading={!request || isLoading}
                    containerStyles="w-full bg-secondary shadow-lg shadow-blue-500/30"
                    icon={<Ionicons name="school" size={24} color="white" />}
                />
            </View>
        </LinearGradient>
    );
}
