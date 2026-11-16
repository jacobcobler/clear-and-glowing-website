export interface ClubEvent {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    category:
        | "Skincare Education"
        | "Wellness & Confidence"
        | "Beauty & Careers"
        | "Philanthropy"
        | "Community"
        | "Brand Collaborations";
    image?: string;
    imageAlt?: string;

    // Controls whether the event appears publicly.
    published: boolean;

    // Controls whether a published event appears
    // in Featured Moments on the homepage.
    featured?: boolean;
}

export const events: ClubEvent[] = [
    {
        id: "beauty-in-business-2026",
        title: "Beauty in Business",
        date: "2026-09-22",
        location: "The Ohio State University",
        description:
            "An event connecting students with people and career paths in the beauty industry.",
        category: "Beauty & Careers",

        published: false,
        featured: true,
    },
    {
        id: "wolstein-summit-2026",
        title: "2026 Wolstein Summit Student Entrepreneur Showcase",
        date: "2026-11-05",
        location: "Columbus, Ohio",
        description:
            "Clear & Glowing shared its mission with the Ohio State entrepreneurship community.",
        category: "Community",

        published: false,
        featured: true,
    },
];
