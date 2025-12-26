import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatsCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    color?: string;
}

export default function StatsCard({ icon, label, value, color = "white" }: StatsCardProps) {
    return (
        <View className="w-[48%] bg-dark-card rounded-2xl p-4 border border-ui-border">
            <View className="flex-row items-center mb-3">
                <Ionicons name={icon} size={18} color="#94a3b8" />
                <Text className="text-ui-textSecondary font-bold text-xs tracking-widest uppercase ml-2">
                    {label}
                </Text>
            </View>
            <Text className="text-white text-2xl font-bold">{value}</Text>
        </View>
    );
}
