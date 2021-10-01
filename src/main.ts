import { normalizePath, Notice, Plugin, TFile } from 'obsidian';
import { PBItem } from 'src/interfaces';
import { PBSectionFuzzySuggestModal } from './section-suggester';
import { PBSettingTab } from './Settings';

export interface Settings {
    pbFilePath: string
}

const DEFAULT_SETTINGS: Settings = {
    pbFilePath: ''
}

declare module "obsidian" {
    interface App {
    }
}

export default class PBPlugin extends Plugin {
    settings: Settings;
    pb: PBItem[];

    async onload() {
        console.log('Loading PhraseBank plugin');

        await this.loadSettings();

        this.addCommand({
            id: 'phrase-bank-suggestor',
            name: 'Pick from Phrase Bank',
            callback: () => new PBSectionFuzzySuggestModal(this.app, this, this.pb, this.settings).open()
        });

        this.addCommand({
            id: 'refresh-phrase-bank',
            name: 'Refresh Phrase Bank',
            callback: async () => await this.refreshPB()
        });

        this.addSettingTab(new PBSettingTab(this.app, this));

        // this.refreshPB()
        // this.pb = JSON.parse(readFileSync('C:\\Users\\rossk\\OneDrive\\1D Personal\\Programming\\Obsidian Plugins\\PB Vault\\.obsidian\\plugins\\Phrase-Bank\\phrasebank.json', 'utf-8'))

        this.pb = []
        this.app.workspace.onLayoutReady(async () => {
            await this.refreshPB()
        })
    }

    mdToJSON(content: string) {
        const lines = content.split('\n');
        const pb: PBItem[] = [];

        for (let line of lines) {
            if (line.startsWith('## ')) {
                // A new heading indicates a new section in the pb
                const section = line.slice(3)
                pb.push({ section, desc: '', keywords: [], phrases: [] })
            } else if (line.startsWith('> ')) {
                // Blockquotes indicate description
                pb.last().desc = line.slice(2)
            } else if (line.startsWith('- ')) {
                // Bullets indicates keywords
                const kws = line.slice(2).split(',');
                pb.last().keywords.push(...kws)
            } else if (line.trim() !== '') {
                // Every other non-blank line is considered a phrase
                pb.last().phrases.push(line)
            }
        }
        return pb
    }

    async refreshPB() {
        if (this.settings.pbFilePath === '') {
            new Notice('Please enter a path to the phrase bank.md file');
            return
        }
        const pbFilePathNorm = normalizePath(this.settings.pbFilePath)
        const pbFile = this.app.vault.getAbstractFileByPath(pbFilePathNorm) as TFile
        const content = await this.app.vault.cachedRead(pbFile)

        this.pb = this.mdToJSON(content)

        new Notice('Phrase Bank Refreshed!')

        console.log({ pb: this.pb, pbFilePathNorm, pbFile })
    }

    onunload() {
        console.log('unloading plugin');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

