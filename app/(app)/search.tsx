import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import SearchBar from '@/components/search/SearchBar';
import CustomButton from '@/components/common/CustomButton';
import TopPeers from '@/components/search/TopPeers';
import { searchUsers } from '@/services/userService';
import { User } from '@/types/user';
import { useConfirmSignOut } from '@/hooks/useConfirmSignOut';

export default function SearchScreen() {
    const router = useRouter();
    const handleSignOut = useConfirmSignOut();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setError(null);
        try {
            const users = await searchUsers(searchQuery.trim());

            const mappedPeers = users.map((u: User) => ({
                id: u.id.toString(),
                name: u.login,
                avatar: u.image?.versions?.medium || u.image?.link,
            }));

            setSearchResults(mappedPeers);

            if (users.length === 0) {
                setError("No peers found.");
            }

        } catch (err) {
            console.error(err);
            setError("Failed to search users.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-dark pt-8">
            <StatusBar barStyle="light-content" />

            <View className="flex-row justify-between items-center px-6 py-4">
                <View className="w-6" />
                <Text className="text-white text-lg font-bold">Student Search</Text>
                <TouchableOpacity onPress={handleSignOut}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6">
                <View className="items-center mt-6 mb-8">
                    <View className="w-20 h-20 bg-dark-card rounded-full justify-center items-center mb-6">
                        <Ionicons name="search" size={32} color="#3b82f6" />
                    </View>
                    <Text className="text-white text-3xl font-bold mb-2">Find a 42 Peer</Text>
                    <Text className="text-gray-400 text-center px-4">
                        Enter a login to view their profile.
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
                    title={isLoading ? "Searching..." : "Search Profile"}
                    handlePress={handleSearch}
                    isLoading={isLoading}
                    containerStyles="w-full bg-secondary mb-2"
                    icon={<Ionicons name="search" size={20} color="white" />}
                />

                {error && (
                    <Text className="text-red-500 text-center mt-4 font-bold">{error}</Text>
                )}
                {searchResults.length > 0 && (
                    <TopPeers
                        peers={searchResults}
                        onSelect={(peer) => router.push(`/user/${peer.name}`)}
                    />
                )}

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
