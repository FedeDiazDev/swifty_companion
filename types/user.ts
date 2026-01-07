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
    pool_month: string;
    pool_year: string;
    location: string | null;
    correction_point: number;
    wallet: number;
    cursus_users: CursusUser[];
    projects_users: ProjectUser[];
}

export interface CursusUser {
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

export interface Skill {
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

export interface ProjectUser {
    id: number;
    occurrence: number;
    final_mark: number;
    status: "finished" | "in_progress" | "waiting_for_correction" | "searching_a_group";
    "validated?": boolean;
    current_team_id: number;
    project: {
        id: number;
        name: string;
        slug: string;
        parent_id: number;
    };
    marked_at: string;
}
