export default defineEventHandler(() => {
    return {
        brand: { title: "LOGO" },

        topNav: [
            {
                label: "LỊCH TRỰC TIẾP",
                to: "/live",
                children: [
                    { label: "BÓNG ĐÁ", emoji: "⚽", to: "/live/football" },
                    { label: "ĐUA BI", emoji: "🎱", to: "/live/billiards" },
                    { label: "BÓNG RỔ", emoji: "🏀", to: "/live/basketball" },
                    { label: "E-SPORTS", emoji: "🎮", to: "/live/esports" },
                    { label: "CASINO", emoji: "🎲", to: "/live/casino" },
                ],

            },
            {
                label: "LỊCH THI ĐẤU",
                to: "/schedule",
                children: [
                    { label: "BÓNG ĐÁ", emoji: "⚽", to: "/live/football" },
                    { label: "ĐUA BI", emoji: "🎱", to: "/live/billiards" },
                    { label: "BÓNG RỔ", emoji: "🏀", to: "/live/basketball" },
                    { label: "E-SPORTS", emoji: "🎮", to: "/live/esports" },
                    { label: "CASINO", emoji: "🎲", to: "/live/casino" },
                ],
            },
            {
                label: "TỶ LỆ KÈO",
                to: "/odds",
                children: [
                    { label: "BÓNG ĐÁ", emoji: "⚽", to: "/live/football" },
                    { label: "ĐUA BI", emoji: "🎱", to: "/live/billiards" },
                    { label: "BÓNG RỔ", emoji: "🏀", to: "/live/basketball" },
                    { label: "E-SPORTS", emoji: "🎮", to: "/live/esports" },
                    { label: "CASINO", emoji: "🎲", to: "/live/casino" },
                ],
            },
            {
                label: "KẾT QUẢ",
                to: "/results",
                children: [
                    { label: "BÓNG ĐÁ", emoji: "⚽", to: "/live/football" },
                    { label: "ĐUA BI", emoji: "🎱", to: "/live/billiards" },
                    { label: "BÓNG RỔ", emoji: "🏀", to: "/live/basketball" },
                    { label: "E-SPORTS", emoji: "🎮", to: "/live/esports" },
                    { label: "CASINO", emoji: "🎲", to: "/live/casino" },
                ],
            },
            {
                label: "PHÒNG CHAT",
                to: "/chat",
                children: [
                    { label: "BÓNG ĐÁ", emoji: "⚽", to: "/live/football" },
                    { label: "ĐUA BI", emoji: "🎱", to: "/live/billiards" },
                    { label: "BÓNG RỔ", emoji: "🏀", to: "/live/basketball" },
                    { label: "E-SPORTS", emoji: "🎮", to: "/live/esports" },
                    { label: "CASINO", emoji: "🎲", to: "/live/casino" },
                ],
            },
            {
                label: "TIN TỨC",
                to: "/news",
                children: [
                    { label: "BÓNG ĐÁ", emoji: "⚽", to: "/live/football" },
                    { label: "ĐUA BI", emoji: "🎱", to: "/live/billiards" },
                    { label: "BÓNG RỔ", emoji: "🏀", to: "/live/basketball" },
                    { label: "E-SPORTS", emoji: "🎮", to: "/live/esports" },
                    { label: "CASINO", emoji: "🎲", to: "/live/casino" },
                ],
            },
        ],

        subNav: [
            { label: "Bảng Tin", icon: "newspaper", to: "/feed" },
            { label: "Reels", icon: "play", to: "/reels" },
            { label: "Highlight", icon: "film", to: "/highlight" },
            { label: "Tip Kèo", icon: "sparkles", to: "/tips" },
            { label: "Phim Ảnh", icon: "video", to: "/movies" },
            { label: "Truyện Tranh", icon: "book", to: "/comics" },
        ],

        liveCategories: [
            {
                label: "BÓNG ĐÁ",
                emoji: "⚽",
                to: "/live/football",
                icon: '',
                value: 'football'
            },
            {
                label: "ĐUA BI",
                emoji: "🎱",
                to: "/live/billiards",
                icon: '',
                value: 'billiards'
            },
            {
                label: "BÓNG RỔ",
                emoji: "🏀",
                to: "/live/basketball",
                icon: '',
                value: 'basketball'
            },
            {
                label: "E-SPORTS",
                emoji: "🎮",
                to: "/live/esports",
                icon: '',
                value: 'esports'
            },
            {
                label: "CASINO",
                emoji: "🎲",
                to: "/live/casino",
                icon: '',
                value: 'casino'
            },
        ],

        user: {
            name: "NguyenVanDen",
            balance: 1000,
            notifications: 2,
            messages: 10,
            level: 20,
            avatarUrl:
                "https://api.dicebear.com/8.x/adventurer/svg?seed=NguyenVanDen",
        },

        accountMenu: [
            { label: "TRANG CÁ NHÂN", icon: "user", to: "/me" },
            { label: "NHIỆM VỤ", icon: "check", to: "/tasks" },
            { label: "VÍ CỦA BẠN", icon: "wallet", to: "/wallet" },
            { label: "LỊCH SỬ GIAO DỊCH", icon: "chart", to: "/transactions" },
            { label: "THOÁT TÀI KHOẢN", icon: "logout", to: "/logout", danger: true },
        ],

        locale: {
            current: "TIẾNG VIỆT",
        },
    };
});
