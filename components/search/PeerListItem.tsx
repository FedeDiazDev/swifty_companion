import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Peer {
    id: string;
    name: string;
    level: number;
    campus: string;
    avatar: string;
}

interface PeerListItemProps {
    peer: Peer;
    onSelect: (peer: Peer) => void;
}

export default function PeerListItem({ peer, onSelect }: PeerListItemProps) {
    return (
        <TouchableOpacity
            onPress={() => onSelect(peer)}
            className="flex-row items-center bg-dark-card rounded-xl p-4 mb-3 border border-ui-border"
        >
            <Image
                source={{ uri: peer.avatar }}
                className="w-12 h-12 rounded-full bg-gray-600 mr-4"
            />

            <View className="flex-1">
                <Text className="text-white text-lg font-bold">{peer.name}</Text>
                <Text className="text-gray-400 text-sm">
                    Level {peer.level} • {peer.campus}
                </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>
    );
}
