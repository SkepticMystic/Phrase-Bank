import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import { PBItem, Settings } from "./interfaces";
import PBPlugin from "./main";
import { PBPhrasesFuzzySuggestModal } from "./phrases-suggester";
import { PBPhraseTypeOrGroupsFuzzySuggestModal } from "./phraseType-or-groups-suggester";
import { getActiveView } from "./utils";

export class PBPhraseTypeFuzzySuggestModal extends FuzzySuggestModal<PBItem> {
  app: App;
  plugin: PBPlugin;
  pb: PBItem[];
  settings: Settings;

  constructor(app: App, plugin: PBPlugin, pb: PBItem[]) {
    super(app);
    this.app = app;
    this.plugin = plugin;
    this.pb = [
      ...pb,
      {
        phraseType: "BACK",
        fileName: "",
        desc: "",
        groups: [],
        keywords: [],
        phrases: [],
      },
    ];
    this.settings = plugin.settings;
    this.scope.register(["Shift"], "Enter", (evt: KeyboardEvent) => {
      // @ts-ignore
      this.chooser.useSelectedItem(evt);
      return false;
    });
  }

  getItems(): PBItem[] {
    return this.pb;
  }

  getItemText(item: PBItem): string {
    return (
      item.phraseType + "|||" + item.keywords.join(", ") + ", " + item.fileName
    );
  }

  renderSuggestion(item: FuzzyMatch<PBItem>, el: HTMLElement) {
    super.renderSuggestion(item, el);
    el.innerText = el.innerText.split("|||")[0];
    this.updateSuggestionElWithDesc(item, el);
  }

  updateSuggestionElWithDesc(item: FuzzyMatch<PBItem>, el: HTMLElement) {
    if (item.item.desc) {
      var indicatorEl = el.createEl("div", {
        text: item.item.desc,
        cls: "PB-Desc",
      });
    }
  }

  onChooseItem(item: PBItem, evt: MouseEvent | KeyboardEvent): void {
    if (item.phraseType === "BACK") {
      this.close();
      new PBPhraseTypeOrGroupsFuzzySuggestModal(this.app, this.plugin).open();
    } else {
      if (!evt.shiftKey) {
        this.close();
        new PBPhrasesFuzzySuggestModal(
          this.app,
          this.plugin,
          item.phrases
        ).open();
      } else {
        const randI = Math.floor(Math.random() * (item.phrases.length - 1));
        const randPhrase = item.phrases[randI];
        try {
          this.close();
          const activeView = getActiveView(this.plugin);
          const activeEditor = activeView.editor;
          const editorRange = activeEditor.getCursor("from");
          activeEditor.replaceRange(randPhrase, editorRange);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
