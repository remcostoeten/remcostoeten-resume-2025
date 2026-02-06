import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '.', '')

	return {
		server: {
			port: 3000,
			host: '0.0.0.0'
		},
		plugins: [react()],
		define: {
			'process.env.VITE_GITHUB_TOKEN': JSON.stringify(env.VITE_GITHUB_TOKEN),
			'process.env.VITE_SPOTIFY_CLIENT_ID': JSON.stringify(env.VITE_SPOTIFY_CLIENT_ID),
			'process.env.VITE_SPOTIFY_CLIENT_SECRET': JSON.stringify(
				env.VITE_SPOTIFY_CLIENT_SECRET
			),
			'process.env.VITE_SPOTIFY_REFRESH_TOKEN': JSON.stringify(
				env.VITE_SPOTIFY_REFRESH_TOKEN
			),
			'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, '.')
			}
		}
	}
})
