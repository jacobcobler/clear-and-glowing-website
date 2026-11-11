export interface Partner {
    id: string;
    name: string;
    relationship:
        | "Past Event Collaborator"
        | "Product Support"
        | "Educational Guest"
        | "Community Partner";
    description: string;
    logo?: string;
    website?: string;
    approved: boolean;
}

export const partners: Partner[] = [];