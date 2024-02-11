import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				black: "#000000",
				white: "#FFFFFF",
				"primary-dark": "#111111",
				"dark-grey": "#444444",
				"light-grey": "#999999",
				"primary-blue": "#0070F3",
				"blue-hue": "#01dfd8",
				"primary-red": "#FF0000",
				"primary-yellow": "#F5A623",
				"primary-violet": "#7928CA",
				"dark-pink": "#ff0080",
				"rose-pink": "#e2008e",
				"semi-transparent": "rgba(0, 0, 0, 0.6)",
			},
			fontFamily: {
				"geist-sans": ["var(--font-geist-sans)"],
				"geist-mono": ["var(--font-geist-mono)"],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
