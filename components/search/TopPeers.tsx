import { View, Text } from 'react-native';
import PeerListItem from './PeerListItem';

interface Peer {
    id: string;
    name: string;
    avatar: string;
}

interface TopPeersProps {
    peers: Peer[];
    onSelect: (peer: Peer) => void;
}

export default function TopPeers({ peers, onSelect }: TopPeersProps) {
    return (
        <View className="w-full mt-8 flex-1">
            <Text className="text-ui-textSecondary font-bold text-sm tracking-wider uppercase mb-4 px-1">
                Results
            </Text>

            <View className="w-full">
                {peers.map((peer) => (
                    <PeerListItem key={peer.id} peer={peer} onSelect={onSelect} />
                ))}
            </View>
        </View>
    );
}
