/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,vue}'],
	theme: {
		colors: {
			black: 'black',
			white: 'white',
			red: 'red',
			transparent: 'transparent',
			terminal: {
				main: {
					primary: 'var(--terminal-main)',
					dark: 'var(--terminal-main-dark)',
					light: 'var(--terminal-main-light)',
				},
			},
		},
		extend: {
			backgroundSize: {
				line: '100% 4px',
			},
			backgroundImage: {
				metal: 'url("/public/grungy-antique-texture-floor-old-rust-692354-pxhere.com.jpeg")',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				lines: 'linear-gradient( to bottom, rgba(18, 16, 16, 0.1) 50%, rgba(0, 0, 0, 0.17) 50% );',
			},
			keyframes: {
				stereo: {
					'0%': {
						textShadow:
							'0.4389924193300864px 0 1px var(--stereo-blue), -0.4389924193300864px 0 1px var(--stereo-red), 0 0 3px',
					},
					'5%': {
						textShadow:
							'2.7928974010788217px 0 1px var(--stereo-blue),-2.7928974010788217px 0 1px var(--stereo-red), 0 0 3px',
					},
					'10%': {
						textShadow:
							'0.02956275843481219px 0 1px var(--stereo-blue),-0.02956275843481219px 0 1px var(--stereo-red),0 0 3px',
					},
					'15%': {
						textShadow:
							'0.40218538552878136px 0 1px var(--stereo-blue),-0.40218538552878136px 0 1px var(--stereo-red),0 0 3px',
					},
					'20%': {
						textShadow:
							'3.4794037899852017px 0 1px var(--stereo-blue),-3.4794037899852017px 0 1px var(--stereo-red),0 0 3px',
					},
					'25%': {
						textShadow:
							'1.6125630401149584px 0 1px var(--stereo-blue),-1.6125630401149584px 0 1px var(--stereo-red),0 0 3px',
					},
					'30%': {
						textShadow:
							'0.7015590085143956px 0 1px var(--stereo-blue),-0.7015590085143956px 0 1px var(--stereo-red),0 0 3px',
					},
					'35%': {
						textShadow:
							'3.896914047650351px 0 1px var(--stereo-blue),-3.896914047650351px 0 1px var(--stereo-red),0 0 3px',
					},
					'40%': {
						textShadow:
							'3.870905614848819px 0 1px var(--stereo-blue),-3.870905614848819px 0 1px var(--stereo-red),0 0 3px',
					},
					'45%': {
						textShadow:
							'2.231056963361899px 0 1px var(--stereo-blue),-2.231056963361899px 0 1px var(--stereo-red),0 0 3px',
					},
					'50%': {
						textShadow:
							'0.08084290417898504px 0 1px var(--stereo-blue),-0.08084290417898504px 0 1px var(--stereo-red),0 0 3px',
					},
					'55%': {
						textShadow:
							'2.3758461067427543px 0 1px var(--stereo-blue),-2.3758461067427543px 0 1px var(--stereo-red),0 0 3px',
					},
					'60%': {
						textShadow:
							'2.202193051050636px 0 1px var(--stereo-blue),-2.202193051050636px 0 1px var(--stereo-red),0 0 3px',
					},
					'65%': {
						textShadow:
							'2.8638780614874975px 0 1px var(--stereo-blue),-2.8638780614874975px 0 1px var(--stereo-red),0 0 3px',
					},
					'70%': {
						textShadow:
							'0.48874025155497314px 0 1px var(--stereo-blue),-0.48874025155497314px 0 1px var(--stereo-red),0 0 3px',
					},
					'75%': {
						textShadow:
							'1.8948491305757957px 0 1px var(--stereo-blue),-1.8948491305757957px 0 1px var(--stereo-red),0 0 3px',
					},
					'80%': {
						textShadow:
							'0.0833037308038857px 0 1px var(--stereo-blue),-0.0833037308038857px 0 1px var(--stereo-red),0 0 3px',
					},
					'85%': {
						textShadow:
							'0.09769827255241735px 0 1px var(--stereo-blue),-0.09769827255241735px 0 1px var(--stereo-red),0 0 3px',
					},
					'90%': {
						textShadow:
							'3.443339761481782px 0 1px var(--stereo-blue),-3.443339761481782px 0 1px var(--stereo-red),0 0 3px',
					},
					'95%': {
						textShadow:
							'2.1841838852799786px 0 1px var(--stereo-blue),-2.1841838852799786px 0 1px var(--stereo-red),0 0 3px',
					},
					'100%': {
						textShadow:
							'2.6208764473832513px 0 1px var(--stereo-blue),-2.6208764473832513px 0 1px var(--stereo-red),0 0 3px',
					},
				},
				moving: {
					'0%': {
						top: '-200%',
					},
					'100%': {
						top: '200%',
					},
				},
				blink: {
					'0%': {
						backgroundColor: 'green',
					},
					'100%': {
						backgroundColor: 'white',
					},
				},
			},
			animation: {
				'text-stereo': 'stereo 4s infinite',
				'svg-stereo': 'stereo-svg 4s infinite',
				'line-moving': 'moving 15s 5s infinite',
				'color-blink': '2s step(4, end) 5 forwards',
			},
			boxShadow: {
				button:
					'0px 3px 0px 0px rgb(34,34,34), 0px 7px 10px 0px rgb(17,17,17), inset 0px 1px 1px 0px rgba(250, 250, 250, .2), inset 0px -12px 35px 0px rgba(0, 0, 0, .5)',
				buttonAfter: '0px 1px 0px 0px rgba(250,250,250,0.1), inset 0px 1px 2px rgba(0, 0, 0, 0.5)',
				buttonActive:
					'0px 0px 0px 0px rgb(34,34,34), 0px 3px 7px 0px rgb(17,17,17),inset 0px 1px 1px 0px rgba(250, 250, 250, .2), inset 0px -10px 35px 5px rgba(0, 0, 0, .5)',
			},
		},
		backgroundSize: {
			small: '50rem',
		},
	},
	plugins: [],
};
