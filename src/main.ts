import { Http2ServerRequest } from 'http2';
import { normalizePath, Notice, Plugin, TFile } from 'obsidian';
import { PBItem } from 'src/interfaces';
import { PBSectionFuzzySuggestModal } from './section-suggester';
import { PBSettingTab } from './Settings';

export interface Settings {
    pbFilePaths: string[]
}

const DEFAULT_SETTINGS: Settings = {
    pbFilePaths: ['']
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

        // const resp = await fetch('https://raw.githubusercontent.com/SkepticMystic/Phrase-Bank/main/Phrase%20Bank.md')
        // resp.text
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
            } else if (line.startsWith('%%')) {
                // Ignore comments
                return
            } else if (line.startsWith('|')) {
                // Ignore tables for now
                return
            } else if (line.trim() !== '') {
                // Every other non-blank line is considered a phrase
                pb.last().phrases.push(line)
            }
        }
        return pb
    }

    mergePBs(localPBs: PBItem[][]) {
        const globalPB: PBItem[] = [];
        localPBs.forEach(localPB => {
            localPB.forEach(pbItem => {
                const existingPBSection = globalPB.findIndex(pb => pb.section === pbItem.section)
                if (existingPBSection > -1) {
                    globalPB[existingPBSection].phrases.push(...pbItem.phrases)
                    globalPB[existingPBSection].keywords.push(...pbItem.keywords)
                    if (globalPB[existingPBSection].desc === '') {
                        globalPB[existingPBSection].desc = pbItem.desc
                    }
                } else {
                    globalPB.push({ ...pbItem })
                }
            })
        })
        return globalPB
    }

    async buildLocalPBs() {
        const localPBs: PBItem[][] = []
        this.settings.pbFilePaths.forEach(async (path) => {
            const pbFilePathNorm = normalizePath(path)
            const pbFile = this.app.vault.getAbstractFileByPath(pbFilePathNorm) as TFile
            const content = await this.app.vault.cachedRead(pbFile)
            console.log({ content })
            localPBs.push(this.mdToJSON(content))
        })

        return localPBs
    }

    async refreshPB() {
        if (this.settings.pbFilePaths[0] === '') {
            new Notice('Please enter a path to the phrase bank.md file');
            return
        }

        const localPBs = await this.buildLocalPBs()
        this.pb = this.mergePBs(localPBs)

        new Notice('Phrase Bank Refreshed!')
        console.log({ pb: this.pb })
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

