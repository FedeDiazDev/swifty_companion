import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export interface AlertButton {
    text: string;
    style?: 'default' | 'cancel' | 'destructive';
    onPress?: () => void;
}

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message?: string;
    buttons?: AlertButton[];
    onClose: () => void;
}

export default function CustomAlert({ visible, title, message, buttons = [], onClose }: CustomAlertProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 justify-center items-center bg-black/70 px-8">
                    <TouchableWithoutFeedback>
                        <View className="w-full bg-dark-card rounded-2xl border border-ui-border overflow-hidden shadow-2xl">
                            <View className="p-6 items-center">
                                <Text className="text-white text-xl font-bold text-center mb-2">{title}</Text>
                                {message && (
                                    <Text className="text-gray-400 text-center text-base leading-5">{message}</Text>
                                )}
                            </View>

                            <View className="flex-row border-t border-ui-border">
                                {buttons.map((btn, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            if (btn.onPress) btn.onPress();
                                            onClose();
                                        }}
                                        className={`flex-1 py-4 items-center ${index < buttons.length - 1 ? 'border-r border-ui-border' : ''} ${btn.style === 'cancel' ? 'bg-dark-elem' : ''} active:bg-dark-hover`}
                                    >
                                        <Text
                                            className={`font-semibold text-base ${btn.style === 'destructive' ? 'text-ui-failure' : btn.style === 'cancel' ? 'text-gray-400' : 'text-primary'}`}
                                        >
                                            {btn.text}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
