export interface Context {
	type: "context"
	elements: Record<string, any>[]
	block_id?: string
}
