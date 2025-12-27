import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
    const { accessToken, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (accessToken) {
        return <Redirect href="/search" />;
    }

    return <Redirect href={"/login" as any} />;
}