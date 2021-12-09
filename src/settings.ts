import { App, PluginSettingTab, Setting } from "obsidian";
import PBPlugin from "src/main";

export class PBSettingTab extends PluginSettingTab {
  plugin: PBPlugin;

  constructor(app: App, plugin: PBPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;
    const { settings, saveSettings } = this.plugin;

    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for Phrase Bank" });

    new Setting(containerEl)
      .setName("Phrase Bank file names")
      .setDesc(
        "Names of your phrase bank.md files in your vault. You can also enter a comma-separated list of pb.md filenames, and the plugin will merge them into one global PB"
      )
      .addText((tc) => {
        tc.setValue(settings.pbFileNames.join(", "));
        tc.inputEl.onblur = async () => {
          const { value } = tc.inputEl;
          settings.pbFileNames = value.split(",").map((path) => path.trim());
          await this.plugin.saveSettings();
          await this.plugin.refreshPB();
        };
      });

    // new Setting(containerEl)
    //   .setName("Use Remote Phrase Bank")
    //   .setDesc(
    //     "Use the content of the community-maintaned PB from: https://raw.githubusercontent.com/SkepticMystic/Phrase-Bank/main/Phrase%20Bank%20copy.md"
    //   )
    //   .addToggle((tg) => {
    //     tg.setValue(settings.useRemotePB).onChange(async (val) => {
    //       settings.useRemotePB = val;
    //       await this.plugin.saveSettings();
    //       await this.plugin.refreshPB();
    //     });
    //   });
  }
}
