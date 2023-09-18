import { Text } from "../Text"

export interface Button {
	type: "button"
	text: Text.Plain
	action_id: string
	url?: string
	value?: string
	style?: string
}
