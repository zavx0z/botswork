export interface Device {
	type: 'mobile' | 'tablet' | 'desktop'
	model?: string
	OS?: string
	versionOS?: string
	tz?: string
	width?: number
	height?: number
	resolution?: number
}

export interface Client {
	type: 'browser' | 'desktop'
	user_agent?: string
	vendor?: string
}
