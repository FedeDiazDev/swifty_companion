import { View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/theme';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LevelCard from '@/components/profile/LevelCard';
import StatsCard from '@/components/profile/StatsCard';
import SkillsSection from '@/components/profile/SkillsSection';
import ProjectsSection from '@/components/profile/ProjectsSection';
import { getUserByLogin, getUserCoalition } from '@/services/userService';
import { User, Coalition } from '@/types/user';

export default function UserProfile() {
    const { login } = useLocalSearchParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [coalition, setCoalition] = useState<Coalition | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!login) return;
            setIsLoading(true);
            try {
                const data = await getUserByLogin(login as string);
                setUser(data);
                const coalitionData = await getUserCoalition(data.id);
                setCoalition(coalitionData);

            } catch (err) {
                console.error(err);
                setError("Failed to load user profile.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [login]);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-dark justify-center items-center">
                <ActivityIndicator size="large" color="#0369a1" />
            </SafeAreaView>
        );
    }

    if (error || !user) {
        return (
            <SafeAreaView className="flex-1 bg-dark justify-center items-center">
                <Text className="text-white text-lg font-bold">{error || "User not found"}</Text>
                <TouchableOpacity onPress={router.back} className="mt-4">
                    <Text className="text-primary text-lg">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const mainCursus = user.cursus_users.find(c => c.cursus.slug.includes("42")) || user.cursus_users[0];
    const userLevel = mainCursus?.level || 0;

    let daysRemaining = null;
    if (mainCursus?.blackholed_at) {
        const bhDate = new Date(mainCursus.blackholed_at);
        const now = new Date();
        const diffTime = bhDate.getTime() - now.getTime();
        daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    // console.log(mainCursus.skills);
    const skills = mainCursus?.skills?.slice(0, 5).map(s => ({
        name: s.name,
        level: s.level,
        color: Colors.skills.algo
    })) || [];


    const projects = user.projects_users
        .map(p => {
            let status: 'success' | 'failure' | 'inprogress' | 'searching' | 'waiting' = 'inprogress';
            if (p["validated?"]) status = 'success';
            else if (p.status === 'finished' && !p["validated?"]) status = 'failure';
            else if (p.status === 'searching_a_group') status = 'searching';
            else if (p.status === 'in_progress') status = 'inprogress';
            else if (p.status === 'waiting_for_correction') status = 'waiting';

            return {
                name: p.project.name,
                status,
                score: p.final_mark,
                timeAgo: p.marked_at ? new Date(p.marked_at).toLocaleDateString() : 'In Progress',
                // Keep original data for sorting
                marked_at: p.marked_at
            };
        })
        .sort((a, b) => {
            const statusPriority = {
                'searching': 0,
                'waiting': 1,
                'inprogress': 2,
                'success': 3,
                'failure': 3
            };

            const priorityA = statusPriority[a.status];
            const priorityB = statusPriority[b.status];

            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            return new Date(b.marked_at || 0).getTime() - new Date(a.marked_at || 0).getTime();
        })
        .slice(0, 7)
    const headerUser = {
        login: user.login,
        name: user.displayname,
        location: user.location || 'Unavailable',
        image_url: user.image?.versions?.medium || user.image?.link,
    };

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <StatusBar barStyle="light-content" />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                <ProfileHeader
                    user={headerUser}
                    coalition={coalition}
                    daysRemaining={daysRemaining}
                />

                {/* <ActionButtons /> */}

                <View className="px-6 mt-6">
                    <LevelCard level={userLevel} />
                </View>

                <View className="flex-row justify-between px-6 mb-8 w-full">
                    <StatsCard icon="wallet" label="Wallet" value={`₳ ${user.wallet}`} />
                    <StatsCard icon="star" label="Corr Points" value={`${user.correction_point}`} />
                </View>

                <SkillsSection skills={skills} />
                <ProjectsSection projects={projects} />

            </ScrollView>
        </SafeAreaView>
    );
}
