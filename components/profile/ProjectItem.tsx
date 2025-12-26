import { View, Text } from 'react-native';

interface ProjectItemProps {
    name: string;
    status: 'success' | 'failure' | 'inprogress' | 'searching' | 'waiting';
    score?: number;
    timeAgo: string;
}

export default function ProjectItem({ name, status, score, timeAgo }: ProjectItemProps) {
    const getStatusColor = () => {
        switch (status) {
            case 'success': return 'bg-ui-success';
            case 'failure': return 'bg-ui-failure';
            case 'searching': return 'bg-blue-500';
            case 'waiting': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'success': return 'SUCCESS';
            case 'failure': return 'FAIL';
            case 'searching': return 'SEARCHING';
            case 'waiting': return 'WAITING';
            default: return 'IN PROGRESS';
        }
    };

    const getStatusTextColor = () => {
        switch (status) {
            case 'success': return 'text-ui-success';
            case 'failure': return 'text-ui-failure';
            case 'searching': return 'text-blue-500';
            case 'waiting': return 'text-orange-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <View className="flex-row items-center mb-6 pl-2 border-l-2 border-slate-800 ml-1">
            <View className={`w-3 h-3 rounded-full ${getStatusColor()} absolute -left-[7px]`} />

            <View className="flex-1 ml-4">
                <Text className="text-white font-bold text-base mb-0.5">{name}</Text>
                <Text className="text-gray-500 text-xs">{timeAgo}</Text>
            </View>

            <View className="items-end">
                {score !== undefined && (
                    <Text className={`text-base font-bold ${getStatusTextColor()}`}>
                        {score}%
                    </Text>
                )}
                <Text className={`text-[10px] font-bold mt-0.5 ${getStatusTextColor()}`}>
                    {getStatusText()}
                </Text>
            </View>
        </View>
    );
}
