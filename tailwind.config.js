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
				secondary: "#DB4444",
				tertiary: "#F5F5F5",
				customGreen: "#0F6",
			},
			backgroundImage: {
				icon: "url('src/assets/icons/iconBg.png')",
			},
		},
	},
	plugins: [],
};
