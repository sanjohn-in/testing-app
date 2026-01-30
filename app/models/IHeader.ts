interface IHeaderData {
    brand: { title: string };
    topNav: {
        label: string; to: string,
        children: { label: string; emoji: string; to: string }[];
    }[];
    subNav: {
        label: string;
        icon: string; to: string;

    }[];
    liveCategories: {
        label: string;
        emoji: string; to: string
        icon: string;
        value: string;
    }[];
    user: {
        name: string;
        balance: number;
        notifications: number;
        messages: number;
        level: number;
        avatarUrl: string;
        value?: string;

    };
    accountMenu: { label: string; icon: string; to: string; danger?: boolean }[];
    locale: { current: string };
};

export { type IHeaderData };
