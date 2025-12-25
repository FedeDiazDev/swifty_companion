import { View, Text, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import SearchBar from '@/components/search/SearchBar';
import CustomButton from '@/components/common/CustomButton';
import RecentSearches from '@/components/search/RecentSearches';
import TopPeers from '@/components/search/TopPeers';

export default function SearchScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const recentSearches = [
        { id: '1', name: 'norminet', avatar: 'https://cdn.intra.42.fr/users/norminet.jpg' },
        { id: '2', name: 'ekantene', initials: 'EK' },
        { id: '3', name: 'zaphod', initials: 'Z' }, // Fallback color
    ];

    const topPeers = [
        { id: '1', name: 'vbaron', level: 21, campus: '42 Paris', avatar: 'https://ui-avatars.com/api/?name=vbaron&background=ffedd5&color=c2410c' },
        { id: '2', name: 'alovelace', level: 18, campus: '42 Fremont', avatar: 'https://ui-avatars.com/api/?name=alovelace&background=ffedd5&color=c2410c' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-dark pt-8">
            <StatusBar barStyle="light-content" />

            <View className="flex-row justify-between items-center px-6 py-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Student Search</Text>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6">
                <View className="items-center mt-6 mb-8">
                    <View className="w-20 h-20 bg-dark-card rounded-full justify-center items-center mb-6">
                        <Ionicons name="search" size={32} color="#3b82f6" />
                    </View>
                    <Text className="text-white text-3xl font-bold mb-2">Find a 42 Peer</Text>
                    <Text className="text-gray-400 text-center px-4">
                        View skills, projects, and levels by entering a student login.
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-gray-300 mb-2 ml-1">Student Login</Text>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <CustomButton
                    title="Search Profile"
                    handlePress={() => { }}
                    containerStyles="w-full bg-secondary mb-2"
                    icon={<Ionicons name="search" size={20} color="white" />}
                />

                <RecentSearches
                    recents={recentSearches}
                    onClear={() => { }}
                    onSelect={(item) => router.push(`/user/${item.name}`)}
                />

                <TopPeers
                    peers={topPeers}
                    onSelect={(peer) => router.push(`/user/${peer.name}`)}
                />

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
