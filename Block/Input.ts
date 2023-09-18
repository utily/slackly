export interface Input {
	type: "input"
	label: Record<string, any>
	element: Record<string, any>
	block_id?: string
	hint?: Record<string, any>
	optional?: boolean
}
