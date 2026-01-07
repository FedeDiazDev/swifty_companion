/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: '#1a2332', // Slate 50
                primary: '#00babc', // tintColorDark
                secondary: '#2563eb', // tintColorLight
                dark: {
                    DEFAULT: '#0f172a', // Slate 900
                    card: '#1e293b',    // Slate 800
                    input: '#334155',   // Slate 700
                },
                ui: {
                    success: '#22c55e',
                    failure: '#ef4444',
                    warning: '#f59e0b',
                    textSecondary: '#94a3b8',
                    border: '#334155',
                },
                skills: {
                    algo: '#8b5cf6',
                    unix: '#3b82f6',
                    graphics: '#2dd4bf',
                    web: '#f97316',
                }
            }
        },
    },
    plugins: [],
}
