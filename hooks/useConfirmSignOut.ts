import { useAuth } from '@/context/AuthContext';
import { useAlert } from '@/context/AlertContext';

export const useConfirmSignOut = () => {
    const { signOut } = useAuth();
    const { showAlert } = useAlert();

    const handleSignOut = () => {
        showAlert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        await signOut();
                    }
                }
            ]
        );
    };

    return handleSignOut;
};
