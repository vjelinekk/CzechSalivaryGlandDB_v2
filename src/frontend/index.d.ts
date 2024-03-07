export {}

import { ipcAPIInsertChannels } from '../ipc/ipcChannels'

declare global {
    interface Window {
        api: {
            insert: (channel: ipcAPIInsertChannels, data: JSON) => void
        }
        fs: {
            save: () => Promise<string>
            getFileIcon: (fileName: string) => Promise<string>
            open: (filePath: string) => void
        }
    }
}
