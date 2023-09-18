import { Text } from "./Text"

export interface Confirm {
	title: Text.Plain
	text: Text
	confirm: Text.Plain
	deny: Text.Plain
	style?: string
}
