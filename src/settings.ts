import { App, PluginSettingTab, Setting, TextComponent } from 'obsidian';
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
            .addText(tc => {
                tc.setValue(settings.pbFilePaths.join(', '))
                tc.inputEl.onblur = async () => {
                    const { value } = tc.inputEl
                    settings.pbFilePaths = value.split(',').map(path => path.trim());
                    await this.plugin.saveSettings();
                }
            });

        new Setting(containerEl)
            .setName('Phrase Bank file path')
            .setDesc('Path to your phrase bank.md file in your vault.')
            .addToggle(tg => {
                tg.setValue(settings.useRemotePB).onChange(async val => {
                    settings.useRemotePB = val;
                    await this.plugin.saveSettings()
                })
            }
            );
    }
}
