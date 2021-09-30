import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import { PBPhrasesFuzzySuggestModal } from "src/phrases-suggester";
import { PBItem } from "src/interfaces";
import { PBSettingsTab } from "src/settings";
import { Settings } from "src/main";

export class PBSectionFuzzySuggestModal extends FuzzySuggestModal<PBItem> {
    app: App;
    pb: PBItem[]
    settings: Settings;

    constructor(app: App, pb: PBItem[], settings: Settings) {
        super(app);
        this.app = app;
        this.pb = pb;
        this.settings = settings;
    }

    getItems(): PBItem[] {
        return this.pb;
    }

    getItemText(item: PBItem): string {
        return item.section;
    }

    renderSuggestion(item: FuzzyMatch<PBItem>, el: HTMLElement) {
        super.renderSuggestion(item, el);
        this.updateSuggestionElForMode(item, el);
    }

    updateSuggestionElForMode(item: FuzzyMatch<PBItem>, el: HTMLElement) {
        var indicatorEl = createEl('div', { text: item.item.desc, cls: 'PB-Desc' });

        el.insertAdjacentElement('afterbegin', indicatorEl);
    }

    onChooseItem(item: PBItem, evt: MouseEvent | KeyboardEvent): void {
        console.log(item.section)
        new PBPhrasesFuzzySuggestModal(this.app, item.phrases, this.settings).open()
    }
}