import { Action } from "./Action"
import { Block } from "./Block"

export class Connection<C extends string> {
	private constructor(readonly token: string, readonly channels: Record<C, string>) {}
	async join(channel: C): Promise<boolean> {
		const result = await Connection.postJson("conversations.join", { channel: this.channels[channel] }, this.token)
		return result.ok
	}
	async send(channel: C, text?: string, blocks?: Block[]): Promise<string | false> {
		const result = await Connection.postJson(
			"chat.postMessage",
			{ channel: this.channels[channel], text: text ?? "", blocks },
			this.token
		)
		return result.ok && typeof result.message == "object" && typeof result.message.ts == "string"
			? result.message.ts
			: false
	}
	async upload(channels: C[], title: string, file: File | string, parent?: string): Promise<string | undefined> {
		const data = new FormData()
		if (typeof file == "string") {
			data.append("filename", title)
			data.append("filetype", "unknown")
		} else {
			data.append("filename", file.name)
			data.append("filetype", file.type)
			data.append("file", file, file.name)
		}
		data.append("channels", channels.map((c: C) => this.channels[c]).join(", "))
		data.append("title", title)
		if (parent)
			data.append("thread_ts", parent)
		const result = await Connection.postMultipart("files.upload", data, this.token)
		return result.ok && typeof result.file == "object" ? result.file.id : "undefined"
	}

	static open<C extends string>(
		token: string | undefined,
		channels: Record<C, string | undefined>
	): Connection<C> | undefined {
		return !token || Object.values(channels).some(v => typeof v == "undefined")
			? undefined
			: new Connection<C>(token, channels as Record<C, string>)
	}
	private static async fetch(
		action: Action,
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
			const response = await fetch("https://slack.com/api/" + action, { method, headers, body })
			result = response.ok && (await response.json())
		} catch (error) {
			console.error("slack connection fetch error", action, method, token, contentType, error)
			result = { ok: false, error }
		}
		return result
	}
	private static postQuery(
		action: Action,
		payload: { [field: string]: string | undefined },
		token?: string
	): Promise<{ ok: boolean } & any> {
		const body = Object.entries(payload)
			.map(field =>
				!field[1] ? encodeURIComponent(field[0]) : `${encodeURIComponent(field[0])}=${encodeURIComponent(field[1])}`
			)
			.join("&")
		return this.fetch(action, "POST", token, "application/x-www-form-urlencoded", body)
	}
	private static postMultipart(action: Action, payload: FormData, token?: string): Promise<{ ok: boolean } & any> {
		return this.fetch(action, "POST", token, undefined, payload)
	}
	private static postJson(action: Action, payload: any, token?: string): Promise<{ ok: boolean } & any> {
		return this.fetch(action, "POST", token, "application/json; charset=utf-8", JSON.stringify(payload))
	}
	static async getToken(code: string, client_id?: string, client_secret?: string): Promise<string | false> {
		const result = await this.postQuery("oauth.v2.access", { code, client_id, client_secret })
		return result.ok && typeof result.access_token == "string" ? result.access_token : false
	}
}
