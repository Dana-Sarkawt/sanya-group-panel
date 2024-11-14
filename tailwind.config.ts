import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	theme: {
		extend: {
			primary: {
				50: '#FFF5F2',
				100: '#FFF1EE',
				200: '#FFE4DE',
				300: '#FFD5CC',
				400: '#FFBCAD',
				500: '#FE795D',
				600: '#EF562F',
				700: '#EB4F27',
				800: '#CC4522',
				900: '#A5371B',
				light: '#4FD1C5',
				DEFAULT: '#38B2AC',
				dark: '#319795'
			},
			main: {
				light: '#63B3ED',
				DEFAULT: '#4299E1',
				dark: '#3182CE'
			},
			secondary: {
				light: '#F687B3',
				DEFAULT: '#ED64A6',
				dark: '#D53F8C'
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio, flowbitePlugin]
} satisfies Config;
