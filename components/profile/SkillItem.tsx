import { View, Text } from 'react-native';
import { Colors } from '@/constants/theme';

interface SkillItemProps {
    name: string;
    level: number;
    color?: string;
}

export default function SkillItem({ name, level, color = Colors.skills.algo }: SkillItemProps) {
    const progress = (level / 21) * 100;
    // console.log(progress);
    return (
        <View className="mb-5">
            <View className="flex-row justify-between items-center mb-2">
                <Text
                    className="text-white font-medium text-base flex-1 mr-4"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
                <Text className="text-ui-textSecondary font-mono text-sm shrink-0">Level {level.toFixed(2)}</Text>
            </View>
            <View className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <View
                    style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: color }}
                    className="h-full rounded-full"
                />
            </View>
        </View>
    );
}
