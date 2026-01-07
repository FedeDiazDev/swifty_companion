import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function LoginHeader() {
    return (
        <View className="mb-12 items-center">
            <View className="w-24 h-24 bg-gray-800 rounded-3xl justify-center items-center border border-gray-700 shadow-xl mb-8">
                <Ionicons name="terminal" size={40} color="#3b82f6" />
            </View>

            <Text className="text-white text-3xl font-bold mb-4 text-center tracking-tight">
                Connect to 42
            </Text>

            <Text className="text-gray-400 text-center text-base leading-6 px-4">
                Securely log in using your intra account to search peers and view profiles.
            </Text>
        </View>
    );
}
