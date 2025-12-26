import api from "./api";

export interface User {
    id: number;
    login: string;
    url: string;
    displayname: string;
    image: {
        link: string;
        versions: {
            medium: string;
            small: string;
            micro: string;
        }
    };
    "pool_month": string;
    "pool_year": string;
    location: string | null;
    correction_point: number;
    wallet: number;
    cursus_users: CursusUser[];
    projects_users: ProjectUser[];
}

interface CursusUser {
    id: number;
    grade: string;
    level: number;
    skills: Skill[];
    blackholed_at: string | null;
    cursus: {
        id: number;
        name: string;
        slug: string;
    }
}

interface Skill {
    id: number;
    name: string;
    level: number;
}

export interface Coalition {
    id: number;
    name: string;
    slug: string;
    image_url: string;
    cover_url: string;
    color: string;
    score: number;
    user_id: number;
}

interface ProjectUser {
    id: number;
    occurrence: number;
    final_mark: number;
    status: "finished" | "in_progress" | "waiting_for_correction" | "searching_a_group";
    "validated?": boolean;
    "current_team_id": number;
    project: {
        id: number;
        name: string;
        slug: string;
        parent_id: number;
    };
    marked_at: string;
}

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