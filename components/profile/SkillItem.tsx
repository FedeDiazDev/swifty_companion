import { View, Text } from 'react-native';
import { Colors } from '@/constants/theme';

interface SkillItemProps {
    name: string;
    level: number;
    color?: string;
}

export default function SkillItem({ name, level, color = Colors.skills.algo }: SkillItemProps) {
    // Normalize level for progress bar (assuming max 21 or loosely based on 20)
    // Design shows filling mostly based on level digit? Or purely visual. 
    // Let's assume a scale for visualization.
    const progress = (level / 21) * 100;

    return (
        <View className="mb-5">
            <View className="flex-row justify-between mb-2">
                <Text className="text-white font-medium text-base">{name}</Text>
                <Text className="text-ui-textSecondary font-mono text-sm">Level {level.toFixed(2)}</Text>
            </View>
            <View className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <View
                    style={{ width: `${Math.min(progress * 3, 100)}%`, backgroundColor: color }}
                    className="h-full rounded-full"
                />
            </View>
        </View>
    );
}
