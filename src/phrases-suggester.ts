import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import PBPlugin from "src/main";
import { PBPhraseTypeOrGroupsFuzzySuggestModal } from "src/phraseType-or-groups-suggester";
import { getActiveView } from "src/utils";
import { Settings } from "./interfaces";

export class PBPhrasesFuzzySuggestModal extends FuzzySuggestModal<string> {
  app: App;
  plugin: PBPlugin;
  phrases: string[];
  settings: Settings;

  constructor(app: App, plugin: PBPlugin, phrases: string[]) {
    super(app);
    this.app = app;
    this.plugin = plugin;
    this.phrases = [...phrases, "BACK"];
    this.settings = plugin.settings;
  }

  getItems(): string[] {
    return this.phrases;
  }

  getItemText(item: string): string {
    return `💬 ${item}`;
  }

  renderSuggestion(item: FuzzyMatch<string>, el: HTMLElement) {
    super.renderSuggestion(item, el);
  }

  onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
    if (item === "BACK") {
      this.close();
      new PBPhraseTypeOrGroupsFuzzySuggestModal(this.app, this.plugin).open();
    } else {
      try {
        const activeView = getActiveView(this.plugin);
        const activeEditor = activeView.editor;
        const editorRange = activeEditor.getCursor("from");
        activeEditor.replaceRange(item, editorRange);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
