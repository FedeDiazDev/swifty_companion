import { View, Text, TouchableOpacity, Image } from 'react-native';

interface RecentSearchItemProps {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
    onSelect: () => void;
}

export default function RecentSearchItem({ id, name, avatar, initials, onSelect }: RecentSearchItemProps) {
    return (
        <TouchableOpacity
            onPress={onSelect}
            className="flex-row items-center bg-dark-card rounded-full pl-2 pr-4 py-2 mr-3 border border-ui-border"
        >
            {avatar ? (
                <Image
                    source={{ uri: avatar }}
                    className="w-8 h-8 rounded-full mr-2 bg-gray-600"
                />
            ) : (
                <View className="w-8 h-8 rounded-full bg-gray-700 justify-center items-center mr-2">
                    <Text className="text-xs text-gray-300 font-bold">{initials}</Text>
                </View>
            )}
            <Text className="text-gray-300 font-medium">{name}</Text>
        </TouchableOpacity>
    );
}
