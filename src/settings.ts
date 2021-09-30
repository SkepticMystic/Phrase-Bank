import { App, PluginSettingTab, Setting } from 'obsidian';
import MyPlugin from './main';

export class PBSettingsTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { settings, saveSettings } = this.plugin;
        let { containerEl } = this;

        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Phrase Bank' });

        new Setting(containerEl)
            .addText(text => {
                text.setValue(settings.pbFilePath).onChange(async value => {
                    settings.pbFilePath = value;
                    await saveSettings()
                })
            }
            )

    }
}
