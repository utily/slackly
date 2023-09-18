import { Confirm } from "../Confirm"
import { Option } from "../Option"

export interface Checkboxes {
	type: "checkboxes"
	action_id: string
	options: Option[]
	initial_options?: Option[]
	confirm?: Confirm
}
