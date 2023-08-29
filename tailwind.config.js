/** @type {import('tailwindcss').Config} */
export default {
	content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: "Poppins, sans-serif",
				inter: "Inter, sans-serif",
			},
			colors: {
				primary: "#FFF",
				secondary: "#000",
				tertiary: {
					100: "hsl(0, 68%, 56%)",
					200: "hsl(0, 78%, 56%)",
					300: "hsl(0, 68%, 80%)",
				},

				extraColor: "#F5F5F5",
			},
			backgroundImage: {
				icon: "url('/src/assets/icons/iconBg.png')",
			},
			screens: {
				xs: "500px",
			},
		},
	},
	plugins: [],
};
