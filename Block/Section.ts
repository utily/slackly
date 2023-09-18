import { Element } from "../Element"
import { Text } from "../Text"

export interface Section {
	type: "section"
	text: Text
	block_id?: string
	fields?: Text[]
	accessory?: (Element.Button | Element.Checkboxes)[]
}
