import { App, PluginSettingTab, Setting } from 'obsidian';
import PBPlugin from "src/main";

export class PBSettingTab extends PluginSettingTab {
    plugin: PBPlugin;

    constructor(app: App, plugin: PBPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;
        const { settings, saveSettings } = this.plugin

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Settings for Phrase Bank' });

        new Setting(containerEl)
            .setName('Phrase Bank file path')
            .setDesc('Path to your phrase bank.md file in your vault.')
            .addText(text => text
                .setValue(settings.pbFilePath)
                .onChange(async (value) => {
                    console.log('Secret: ' + value);
                    settings.pbFilePath = value;
                    await saveSettings();
                }));
    }
}
