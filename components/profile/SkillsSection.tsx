import { View, Text } from 'react-native';
import SkillItem from './SkillItem';
import { Colors } from '@/constants/theme';

interface SkillsSectionProps {
    skills: {
        name: string;
        level: number;
        color: string;
    }[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    return (
        <View className="px-6 mb-8">
            <View className="bg-dark-card rounded-2xl p-4 border border-ui-border">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-lg font-bold">Skills</Text>
                </View>
                {skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <SkillItem key={index} {...skill} />
                    ))
                ) : (
                    <Text className="text-gray-500 italic">No skills found.</Text>
                )}
            </View>
        </View>
    );
}
