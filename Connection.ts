import { Block } from "./Block"
import { Method } from "./Method"

export class Connection {
	constructor(readonly token: string) {}
	async join(channel: string): Promise<boolean> {
		const result = await Connection.postJson("conversations.join", { channel }, this.token)
		return result.ok
	}
	async send(channel: string, text: string, blocks?: Block[]): Promise<string | false> {
		const result = await Connection.postJson("chat.postMessage", { channel, text, blocks }, this.token)
		return result.ok && typeof result.message == "object" && typeof result.message.ts == "string"
			? result.message.ts
			: false
	}
	async upload(channels: string[], title: string, file: File | string, parent?: string): Promise<string | undefined> {
		const data = new FormData()
		if (typeof file == "string") {
			data.append("filename", title)
			data.append("filetype", "unknown")
		} else {
			data.append("filename", file.name)
			data.append("filetype", file.type)
			data.append("file", file, file.name)
		}
		data.append("channels", channels.join(", "))
		data.append("title", title)
		if (parent)
			data.append("thread_ts", parent)
		const result = await Connection.postMultipart("files.upload", data, this.token)
		return result.ok && typeof result.file == "object" ? result.file.id : "undefined"
	}
	private static async fetch(
		command: Method,
		method: "GET" | "POST" = "GET",
		token?: string,
		contentType?: string,
		body?: string | ArrayBuffer | FormData
	): Promise<{ ok: boolean } & any> {
		let result: { ok: boolean } & any
		const headers: HeadersInit = {}
		if (token)
			headers.authorization = "Bearer " + token
		if (contentType)
			headers["content-type"] = contentType
		try {
			const response = await fetch("https://slack.com/api/" + command, { method, headers, body }) // : typeof body == "string" ? body : body && new TextDecoder().decode(new Uint8Array(body))
			result = response.ok && (await response.json())
		} catch (error) {
			console.error("slack connection fetch error", command, method, token, contentType, error)
			result = { ok: false, error }
		}
		return result
	}
	private static postQuery(
		method: Method,
		payload: { [field: string]: string | undefined },
		token?: string
	): Promise<{ ok: boolean } & any> {
		const body = Object.entries(payload)
			.map(field =>
				!field[1] ? encodeURIComponent(field[0]) : `${encodeURIComponent(field[0])}=${encodeURIComponent(field[1])}`
			)
			.join("&")
		return this.fetch(method, "POST", token, "application/x-www-form-urlencoded", body)
	}
	private static postMultipart(method: Method, payload: FormData, token?: string): Promise<{ ok: boolean } & any> {
		return this.fetch(method, "POST", token, undefined, payload)
	}
	private static postJson(method: Method, payload: any, token?: string): Promise<{ ok: boolean } & any> {
		return this.fetch(method, "POST", token, "application/json; charset=utf-8", JSON.stringify(payload))
	}
	static async getToken(code: string, client_id?: string, client_secret?: string): Promise<string | false> {
		const result = await this.postQuery("oauth.v2.access", { code, client_id, client_secret })
		return result.ok && typeof result.access_token == "string" ? result.access_token : false
	}
}
