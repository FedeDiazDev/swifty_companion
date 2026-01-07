import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ActionButtons() {
    return (
        <View className="flex-row w-full px-6 space-x-3 mb-6 gap-3">
            <TouchableOpacity className="flex-1 flex-row bg-dark-card py-3 rounded-xl justify-center items-center border border-ui-border">
                <Ionicons name="mail" size={20} color="#94a3b8" className="mr-2" />
                <Text className="text-gray-300 font-bold ml-2">Email</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-row bg-secondary py-3 rounded-xl justify-center items-center shadow-lg shadow-blue-500/30">
                <Ionicons name="call" size={20} color="white" className="mr-2" />
                <Text className="text-white font-bold ml-2">Mobile</Text>
            </TouchableOpacity>
        </View>
    );
}
