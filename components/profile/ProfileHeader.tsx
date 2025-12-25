import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';

interface ProfileHeaderProps {
    user: {
        login: string;
        name: string;
        location: string;
        image_url: string;
    };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    const router = useRouter();

    return (
        <View className="items-center w-full">
            {/* Navigation Header */}
            <View className="flex-row justify-between items-center w-full px-6 py-2 mb-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">{user.login}</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Avatar Section */}
            <View className="items-center mb-4">
                <View className="relative">
                    <View className="p-1.5 rounded-full border-2 border-primary">
                        <Image
                            source={{ uri: user.image_url }}
                            className="w-28 h-28 rounded-full bg-gray-600"
                        />
                    </View>
                    {/* Online Status Indicator (Optional/Mock) */}
                    <View className="absolute bottom-2 right-2 w-6 h-6 bg-ui-success rounded-full border-4 border-dark" />
                </View>

                <Text className="text-white text-2xl font-bold mt-3 mb-1">{user.name}</Text>

                <View className="flex-row items-center mb-3">
                    <Text className="text-primary font-bold">{user.login}</Text>
                    <Text className="text-gray-500 mx-2">•</Text>
                    <Ionicons name="location-sharp" size={14} color="#94a3b8" />
                    <Text className="text-gray-400 ml-1">{user.location}</Text>
                </View>

                {/* Days Remaining Badge */}
                <View className="bg-red-900/30 px-4 py-1.5 rounded-full border border-red-900/50 flex-row items-center">
                    <Ionicons name="hourglass-outline" size={14} color="#ef4444" className="mr-2" />
                    <Text className="text-ui-failure text-xs font-bold ml-1">23 days remaining</Text>
                </View>
            </View>
        </View>
    );
}
