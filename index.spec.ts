import { slackly } from "./index"

describe("Test", () => {
	it("example", () => {
		const slack = slackly.Connection.open("token", {
			treasury: "treasuryId",
			settlement: "settlementId",
		})
		expect(slack).toBeTruthy()
	})
})
