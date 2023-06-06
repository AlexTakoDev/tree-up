module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4da6ff',
                    DEFAULT: '#0067ef',
                    dark: '#3549c2',
                },
                secondary: {
                    light: '#f39e58',
                    DEFAULT: '#ed7410',
                    dark: '#bf5d0d',
                },
                gradient: {
                    first: '#0067EF',
                    second: '#79527C',
                    third: '#E86308'
                },
                'dark' : '#2C2C2C',
                'gray-1': '#ECECEC'
            },
            
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
