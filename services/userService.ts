import api from "./api";
import { User, Coalition } from "@/types/user";

export async function searchUsers(query: string) {
    if (!query) return [];

    const response = await api.get(`/users`, {
        params: {
            'search[login]': query,
            'per_page': 5
        }
    });
    return response.data;
}

export async function getUserByLogin(login: string) {
    const response = await api.get(`/users/${login}`);
    return response.data;
}

export async function getUserCoalition(userId: number) {
    const response = await api.get(`/users/${userId}/coalitions_users`, {
        params: {
            'sort': '-created_at',
            'per_page': 1
        }
    });

    const coalitionUser = response.data[0];
    if (!coalitionUser?.coalition_id) return null;

    try {
        const fullCoalition = await api.get(`/coalitions/${coalitionUser.coalition_id}`);
        // console.log(fullCoalition.data);
        return fullCoalition.data;
    } catch (error) {
        console.error("Error fetching coalition details:", error);
        return null;
    }
}