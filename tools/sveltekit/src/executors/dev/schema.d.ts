export interface DevExecutorSchema {
	port?: number;
	watchDepthSvelteProjects?: string[];
	typegenWatch?: boolean;
	env?: { [key: string]: [value: string] }
}
