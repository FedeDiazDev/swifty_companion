import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder = "e.g., marvin" }: SearchBarProps) {
    return (
        <View className="w-full flex-row items-center bg-dark-input rounded-xl px-4 py-3 border border-ui-border">
            <Ionicons name="at" size={24} color={Colors.dark.icon} className="mr-3" />
            <TextInput
                className="flex-1 text-white text-base font-normal h-full"
                placeholder={placeholder}
                placeholderTextColor={Colors.dark.icon}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
            />
        </View>
    );
}
