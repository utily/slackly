import { Button as ButtonElement } from "./Button"
import { Checkboxes as CheckboxesElement } from "./Checkboxes"

export type Element = ButtonElement | CheckboxesElement

export namespace Element {
	export type Button = ButtonElement
	export type Checkboxes = CheckboxesElement
}
