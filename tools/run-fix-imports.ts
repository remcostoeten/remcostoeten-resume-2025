import { Project } from 'ts-morph'

const project = new Project()
project.addSourceFilesAtPaths(['src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/.next/**'])
