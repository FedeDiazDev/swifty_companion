import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ActionButtons from '@/components/profile/ActionButtons';
import LevelCard from '@/components/profile/LevelCard';
import StatsCard from '@/components/profile/StatsCard';
import SkillItem from '@/components/profile/SkillItem';
import ProjectItem from '@/components/profile/ProjectItem';

export default function UserProfile() {
    const { login } = useLocalSearchParams();
    const router = useRouter();

    // Mock User Data matching the design
    const user = {
        login: (login as string) || 'jdoe',
        name: 'John Doe',
        location: 'e1r4p8',
        image_url: 'https://ui-avatars.com/api/?name=John+Doe&background=ffedd5&color=c2410c&size=256',
        level: 12.45,
        wallet: 520,
        evalPoints: 12,
    };

    const skills = [
        { name: 'Algorithms & AI', level: 6.20, color: Colors.skills.algo },
        { name: 'Unix', level: 5.80, color: Colors.skills.unix },
        { name: 'Graphics', level: 3.10, color: Colors.skills.graphics },
        { name: 'Web', level: 2.50, color: Colors.skills.web },
    ];

    const projects = [
        { name: 'ft_transcendence', status: 'success' as const, score: 125, timeAgo: 'Completed 2 days ago' },
        { name: 'webserv', status: 'success' as const, score: 100, timeAgo: 'Completed 1 week ago' },
        { name: 'cpp_module_09', status: 'failure' as const, score: 42, timeAgo: 'Failed 2 weeks ago' },
        { name: 'inception', status: 'inprogress' as const, timeAgo: 'Started 3 weeks ago' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <StatusBar barStyle="light-content" />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Header Section */}
                <ProfileHeader user={user} />

                {/* Action Buttons */}
                <ActionButtons />

                {/* Level Card */}
                <LevelCard level={user.level} />

                {/* Stats Row */}
                <View className="flex-row px-6 mb-8 gap-4">
                    <StatsCard icon="wallet" label="Wallet" value={`₳ ${user.wallet}`} />
                    <StatsCard icon="star" label="Eval Points" value={`${user.evalPoints}`} />
                </View>

                {/* Skills Section */}
                <View className="px-6 mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-lg font-bold">Skills</Text>
                        <TouchableOpacity>
                            <Text className="text-primary text-sm font-bold">View All</Text>
                        </TouchableOpacity>
                    </View>
                    {skills.map((skill, index) => (
                        <SkillItem key={index} {...skill} />
                    ))}
                </View>

                {/* Projects Section */}
                <View className="px-6 mb-10">
                    <Text className="text-white text-lg font-bold mb-4">Recent Projects</Text>
                    {projects.map((project, index) => (
                        <ProjectItem key={index} {...project} />
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
