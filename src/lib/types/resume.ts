export type Basics = {
	name: string;
	title: string;
	location: string;
	email: string;
	phone: string;
	site: string;
	github: string;
	linkedin: string;
};

export type Experience = {
	company: string;
	role: string;
	period: string;
	bullets: string[];
};

export type Project = {
	name: string;
	desc: string;
	link?: string;
};

export type Education = {
	institution: string;
	degree: string;
	period: string;
};

export type Language = {
	name: string;
	level: string;
};

export type Skills = {
	languages: string[];
	frameworks: string[];
	styling: string[];
	backend: string[];
	databases: string[];
	tools: string[];
	design: string[];
};

export type Resume = {
	basics: Basics;
	summary: string[];
	experience: Experience[];
	education: Education[];
	projects: Project[];
	skills: Skills;
	languages: Language[];
};