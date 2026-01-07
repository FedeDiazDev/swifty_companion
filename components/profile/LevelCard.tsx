import { View, Text } from 'react-native';

interface LevelCardProps {
    level: number;
}

export default function LevelCard({ level }: LevelCardProps) {
    const levelFixed = level.toFixed(2);
    const [levelIntStr, levelDecimal] = levelFixed.split('.');
    const levelInt = parseInt(levelIntStr);
    const percentage = parseInt(levelDecimal);

    return (
        <View className="bg-dark-card rounded-2xl p-5 mb-4 border border-ui-border">
            <View className="flex-row justify-between items-end mb-4">
                <Text className="text-ui-textSecondary font-bold text-xs tracking-widest uppercase mb-1">
                    LEVEL
                </Text>
                <View className="flex-row items-baseline">
                    <Text className="text-white text-3xl font-bold">{levelIntStr}</Text>
                    <Text className="text-gray-500 text-xl font-bold">.{levelDecimal}</Text>
                </View>
            </View>

            {/* Progress Bar Container */}
            <View className="h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                <View
                    style={{ width: `${percentage}%` }}
                    className="h-full bg-primary rounded-full"
                />
            </View>

            <Text className="text-right text-gray-500 text-xs font-medium">
                {percentage}% to level {levelInt + 1}
            </Text>

            {/* Decorative arrow/indicator (Mocking the design) */}
            <View
                className="absolute right-5 top-14 items-center"
                style={{ left: `${percentage}%`, marginLeft: 10 }} // Rough positioning
            >
                {/* Could add a custom SVG arrow here later if needed */}
            </View>
        </View>
    );
}
