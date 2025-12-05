import {int} from "@naomiarotest/lib-std"
import {Browser} from "@naomiarotest/lib-dom"

export class UserCounter {
    readonly #sessionId: string
    readonly #apiUrl: string

    #heartbeatInterval: number | null = null

    constructor(apiUrl: string) {
        this.#sessionId = Browser.id()
        this.#apiUrl = apiUrl
    }

    start(): Promise<int> {
        this.#heartbeatInterval = window.setInterval(() => this.#sendHeartbeat(), 45000)
        return this.#sendHeartbeat()
    }

    stop(): void {
        if (this.#heartbeatInterval) {
            clearInterval(this.#heartbeatInterval)
            this.#heartbeatInterval = null
        }
    }

    async updateUserCount(): Promise<number> {
        try {
            const response = await fetch(this.#apiUrl)
            const data = await response.json()
            return data.count || 0
        } catch (error) {
            console.error("Failed to get user count:", error)
            return 0
        }
    }

    async #sendHeartbeat() {
        try {
            const response = await fetch(this.#apiUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({sessionId: this.#sessionId})
            })
            const data = await response.json()
            return data.count
        } catch (error) {
            console.warn("Failed to send heartbeat:", error)
            return 0
        }
    }
}