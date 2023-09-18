import { Markdown as MarkdownText } from "./Markdown"
import { Plain as PlainText } from "./Plain"

export type Text = PlainText | MarkdownText

export namespace Text {
	export type Plain = PlainText
	export type Markdown = MarkdownText
}
