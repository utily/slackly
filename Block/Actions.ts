export interface Actions {
	type: "actions"
	elements: Record<string, unknown>[]
	block_id?: string
}
