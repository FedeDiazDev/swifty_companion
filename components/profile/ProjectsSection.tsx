import { View, Text } from 'react-native';
import ProjectItem from './ProjectItem';

interface ProjectsSectionProps {
    projects: {
        name: string;
        status: 'success' | 'failure' | 'inprogress' | 'searching' | 'waiting';
        score?: number;
        timeAgo: string;
    }[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    return (
        <View className="px-6 mb-10">
            <View className="bg-dark-card rounded-2xl p-4 border border-ui-border">
                <Text className="text-white text-lg font-bold mb-4">Recent Projects</Text>
                {projects.length > 0 ? (
                    // console.log(projects),
                    projects.map((project, index) => (
                        <ProjectItem key={index} {...project} />
                    ))
                ) : (
                    <Text className="text-gray-500 italic">No recent projects.</Text>
                )}
            </View>
        </View>
    );
}
