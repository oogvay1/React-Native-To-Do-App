
export const baseTheme = {
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    typography: {
        fontRegular: 'System',
        fontBold: 'System',
        fontSize: {
            sm: 12,
            md: 16,
            lg: 20,
            xl: 28,
        },
    },
};

export const lightTheme = {
    ...baseTheme,
    colors: {
        background: '#ff0000ff',
        text: '#1C1C1E',
        primary: '#007AFF',
        secondary: '#34C759',
        border: '#E5E5EA',
    },
};

export const darkTheme = {
    ...baseTheme,
    colors: {
        background: '#1C1C1E',
        text: '#FFFFFF',
        primary: '#0A84FF',
        secondary: '#30D158',
        border: '#3A3A3C',
    },
};
