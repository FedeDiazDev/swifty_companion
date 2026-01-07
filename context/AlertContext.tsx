import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomAlert, { AlertButton } from '@/components/common/CustomAlert';

interface AlertContextType {
    showAlert: (title: string, message: string, buttons?: AlertButton[]) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [config, setConfig] = useState<{ title: string; message: string; buttons: AlertButton[] }>({
        title: '',
        message: '',
        buttons: [],
    });

    const showAlert = (title: string, message: string, buttons: AlertButton[] = []) => {
        setConfig({ title, message, buttons });
        setVisible(true);
    };

    const hideAlert = () => {
        setVisible(false);
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            <CustomAlert
                visible={visible}
                title={config.title}
                message={config.message}
                buttons={config.buttons}
                onClose={hideAlert}
            />
        </AlertContext.Provider>
    );
}

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
