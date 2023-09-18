import { Actions as ActionsBlock } from "./Actions"
import { Context as ContextBlock } from "./Context"
import { Divider as DividerBlock } from "./Divider"
import { File as FileBlock } from "./File"
import { Image as ImageBlock } from "./Image"
import { Input as InputBlock } from "./Input"
import { Section as SectionBlock } from "./Section"

export type Block = ActionsBlock | ContextBlock | DividerBlock | FileBlock | ImageBlock | InputBlock | SectionBlock

export namespace Block {
	export type Actions = ActionsBlock
	export type Context = ContextBlock
	export type Divider = DividerBlock
	export type File = FileBlock
	export type Image = ImageBlock
	export type Input = InputBlock
	export type Section = SectionBlock
}
