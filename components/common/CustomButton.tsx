import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
    title: string;
    handlePress: (event: GestureResponderEvent) => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles = "",
    textStyles = "",
    isLoading = false,
    icon
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[58px] min-w-[162px] flex-row justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            {icon && <View className="mr-3">{icon}</View>}
            <Text className={`text-white font-semibold text-lg ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton;