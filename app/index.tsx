import CustomButton from '@/components/common/CustomButton';
import LoginHeader from '@/components/login/LoginHeader';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

export default function App() {
    return (
        <LinearGradient
            colors={['#0f172a', '#1e293b']}
            className="flex-1 justify-center items-center h-full px-8"
        >
            <LoginHeader />
            <View className="w-full">
                <CustomButton
                    title="Log in with 42"
                    handlePress={() => { }}
                    containerStyles="w-full bg-secondary shadow-lg shadow-blue-500/30"
                    icon={<Ionicons name="school" size={24} color="white" />}
                />
            </View>
        </LinearGradient>
    );
}