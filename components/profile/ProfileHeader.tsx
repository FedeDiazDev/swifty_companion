import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Coalition } from '@/services/userService';
import { useConfirmSignOut } from '@/hooks/useConfirmSignOut';

const isDarkColor = (hex: string) => {
    return true;
}

interface ProfileHeaderProps {
    user: {
        login: string;
        name: string;
        location: string;
        image_url: string;
    };
    coalition: Coalition | null;
    daysRemaining: number | null;
}

export default function ProfileHeader({ user, coalition, daysRemaining }: ProfileHeaderProps) {
    const router = useRouter();
    const handleSignOut = useConfirmSignOut();

    let bhText = "Inmortal";
    let bhColor = "text-ui-success";
    let bhIcon: keyof typeof Ionicons.glyphMap = "infinite";
    let bhContainerBorder = "border-green-500/50";
    let bhContainerBg = "bg-green-900/30";

    if (daysRemaining !== null) {
        if (daysRemaining < 0) {
            bhText = "Absorbed";
            bhColor = "text-ui-failure";
            bhIcon = "skull";
            bhContainerBorder = "border-red-900/50";
            bhContainerBg = "bg-red-900/30";
        } else {
            bhText = `${daysRemaining} days left`;
            bhColor = "text-ui-warning";
            bhIcon = "hourglass-outline";
            if (daysRemaining < 30) {
                bhColor = "text-ui-failure";
                bhContainerBorder = "border-red-500/50";
                bhContainerBg = "bg-red-900/30";
            } else {
                bhColor = "text-yellow-500";
                bhContainerBorder = "border-yellow-500/50";
                bhContainerBg = "bg-yellow-900/30";
            }
        }
    }

    return (
        <View className="items-center w-full overflow-hidden pb-6 mb-2" style={coalition?.color ? { backgroundColor: `${coalition.color}20` } : undefined}>
            <View className="flex-row justify-between items-center w-full px-6 py-2 mb-4 mt-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <View className="flex-row items-center">
                    {coalition?.cover_url && (
                        <Image source={{ uri: coalition.cover_url }} className="w-6 h-6 mr-2 rounded-full" />
                    )}
                    <Text className="text-white text-lg font-bold">{user.login}</Text>
                </View>
                <TouchableOpacity onPress={handleSignOut}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className="items-center mb-4">
                <View className="relative">
                    <View className="p-1.5 rounded-full border-4" style={{ borderColor: coalition?.color || Colors.dark.tint }}>
                        <Image
                            source={{ uri: user.image_url }}
                            className="w-28 h-28 rounded-full bg-gray-600"
                        />
                    </View>
                    <View className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-dark ${user.location !== 'Unavailable' ? 'bg-ui-success' : 'bg-ui-failure'}`} />
                </View>

                <Text className="text-white text-2xl font-bold mt-3 mb-1">{user.name}</Text>

                <View className="flex-row items-center mb-3 flex-wrap justify-center">
                    <Text className="font-bold text-lg" style={{ color: coalition?.color || Colors.dark.tint }}>
                        {coalition?.name || "Student"}
                    </Text>
                    {user.location && (
                        <View className="flex-row items-center">
                            <Text className="text-gray-500 mx-2">•</Text>
                            <Ionicons name="location-sharp" size={14} color="#94a3b8" />
                            <Text className="text-gray-400 ml-1">{user.location}</Text>
                        </View>
                    )}
                </View>

                <View className={`px-4 py-1.5 rounded-full border flex-row items-center ${bhContainerBg} ${bhContainerBorder}`}>
                    <Ionicons name={bhIcon} size={14} color={daysRemaining !== null && daysRemaining < 30 ? "#ef4444" : "#eab308"} className="mr-2" />
                    <Text className={`text-xs font-bold ml-1 ${bhColor}`}>{bhText}</Text>
                </View>
            </View>
        </View>
    );
}
