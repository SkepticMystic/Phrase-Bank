import { Plugin, TFile } from 'obsidian';
import { PBItem } from 'src/interfaces';
import { PBSectionFuzzySuggestModal } from './section-suggester';
import { PBSettingsTab } from './Settings';

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

export default class PhraseBankPlugin extends Plugin {
    settings: Settings;
    pb: PBItem[];

    async onload() {
        console.log('Loading Metadataframe plugin');

        await this.loadSettings();

        this.addCommand({
            id: 'write-metadataframe',
            name: 'Write Metadataframe',
            callback: () => new PBSectionFuzzySuggestModal(this.app, this, this.pb, this.settings).open()
        });

        this.addSettingTab(new PBSettingsTab(this.app, this));

        // this.refreshPB()
        // this.pb = JSON.parse(readFileSync('C:\\Users\\rossk\\OneDrive\\1D Personal\\Programming\\Obsidian Plugins\\PB Vault\\.obsidian\\plugins\\Phrase-Bank\\phrasebank.json', 'utf-8'))

        const currFile = this.app.vault.getAbstractFileByPath('Phrase Bank.md') as TFile
        this.pb = this.mdToJSON(await this.app.vault.cachedRead(currFile))
        console.log(this.pb)
    }

    mdToJSON(content: string) {
        const lines = content.split('\n');
        const pb: PBItem[] = [];

        for (let line of lines) {
            if (line.startsWith('## ')) {
                const section = line.slice(3)
                pb.push({ section, desc: '', keywords: [], phrases: [] })
            } else if (line.trim() !== '') {
                pb.last().phrases.push(line)
            }
        }
        return pb
    }

    refreshPB() {

        // this.mdToJSON(pbFile)
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

