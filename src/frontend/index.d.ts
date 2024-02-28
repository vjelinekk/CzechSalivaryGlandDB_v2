export {}

declare global {
    interface Window {
        api: {
            send: (channel: string, data: any) => Promise<any>
            receive: (channel: string, func: (data: any) => void) => void
        }
    }
}
