import { Confirm } from "../Confirm"
import { Text } from "../Text"

export interface DatePicker {
	type: "datepicker"
	action_id: string
	placeholder?: Text.Plain
	initial_date: string
	confirm?: Confirm
}
