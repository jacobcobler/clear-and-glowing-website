export interface Chapter {
    id: string;
    university: string;
    city: string;
    state: string;
    status: "established" | "launching" | "interest";
    founded?: string;
    instagramUrl?: string;
    image?: string;
    approved: boolean;
}

export const chapters: Chapter[] = [
    {
        id: "ohio-state",
        university: "The Ohio State University",
        city: "Columbus",
        state: "Ohio",
        status: "established",
        founded: "Fall 2024",
        approved: true,
    },
];