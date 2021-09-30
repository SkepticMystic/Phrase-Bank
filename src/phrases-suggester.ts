import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import { Settings } from "src/main";
import { PBSettingsTab } from "src/settings";

export class PBPhrasesFuzzySuggestModal extends FuzzySuggestModal<string> {
    app: App;
    phrases: string[];
    settings: Settings;

    constructor(app: App, phrases: string[], settings: Settings) {
        super(app);
        this.app = app;
        this.phrases = phrases;
        this.settings = settings;
    }

    getItems(): string[] {
        return this.phrases;
    }

    getItemText(item: string): string {
        return item;
    }

    renderSuggestion(item: FuzzyMatch<string>, el: HTMLElement) {
        super.renderSuggestion(item, el);
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
        console.log(item);

    }
}