import { Actions as ActionsBlock } from "./Actions"
import { Context as ContextBlock } from "./Context"
import { Divider as DividerBlock } from "./Divider"
import { File as FileBlock } from "./File"
import { Header as HeaderBlock } from "./Header"
import { Image as ImageBlock } from "./Image"
import { Input as InputBlock } from "./Input"
import { Section as SectionBlock } from "./Section"

export type Block =
	| ActionsBlock
	| ContextBlock
	| DividerBlock
	| FileBlock
	| HeaderBlock
	| ImageBlock
	| InputBlock
	| SectionBlock

export namespace Block {
	export type Actions = ActionsBlock
	export type Context = ContextBlock
	export type Divider = DividerBlock
	export type File = FileBlock
	export type Header = HeaderBlock
	export type Image = ImageBlock
	export type Input = InputBlock
	export type Section = SectionBlock
	export function format(header: string, text: string): Block[] {
		const blocks: Block[] = [
			{
				type: "header",
				text: {
					type: "plain_text",
					text: header,
					emoji: true,
				},
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text,
				},
			},
		]
		return blocks
	}
}
