import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import RecentSearchItem from './RecentSearchItem';

interface RecentSearchItemData {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
}

interface RecentSearchesProps {
    recents: RecentSearchItemData[];
    onClear: () => void;
    onSelect: (item: RecentSearchItemData) => void;
}

export default function RecentSearches({ recents, onClear, onSelect }: RecentSearchesProps) {
    return (
        <View className="w-full mt-8">
            <View className="flex-row justify-between items-center mb-4 px-1">
                <Text className="text-ui-textSecondary font-bold text-sm tracking-wider uppercase">
                    Recent Searches
                </Text>
                <TouchableOpacity onPress={onClear}>
                    <Text className="text-secondary text-sm">Clear All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {recents.map((item) => (
                    <RecentSearchItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        avatar={item.avatar}
                        initials={item.initials}
                        onSelect={() => onSelect(item)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
