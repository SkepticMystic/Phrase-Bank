import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import { getActiveView } from "src/utils";
import { GroupItem, PBItem } from "src/interfaces";
import PBPlugin, { Settings } from "src/main";
import { PBPhrasesFuzzySuggestModal } from "src/phrases-suggester";
import { PBPhraseTypeFuzzySuggestModal } from "src/phraseType-only-suggester";

export class PBPhraseTypeOrGroupsFuzzySuggestModal extends FuzzySuggestModal<PBItem | GroupItem> {
    app: App;
    plugin: PBPlugin
    pb: PBItem[]
    settings: Settings;

    constructor(app: App, plugin: PBPlugin, pb: PBItem[], settings: Settings) {
        super(app);
        this.app = app;
        this.plugin = plugin
        this.pb = pb;
        this.settings = settings;
        this.scope.register(['Shift'], 'Enter', (evt: KeyboardEvent) => {
            // @ts-ignore
            this.chooser.useSelectedItem(evt);
            return false;
        });
    }

    getItems(): (PBItem | GroupItem)[] {
        const groups = this.pb.map(item => item.groups).flat(3)
        const noDupGroups: GroupItem[] = []
        groups.forEach(group => {
            if (!noDupGroups.some(g => g.name === group.name)) {
                noDupGroups.push(group)
            }
        })
        return [...this.pb, ...noDupGroups];
    }

    getItemText(item: PBItem | GroupItem): string {
        if (item.phraseType) {
            return (item as PBItem).phraseType + '|||' + item.keywords.join(', ') + ', ' + item.fileName;
        } else if (item.name) {
            return '📂 ' + (item as GroupItem).name
        }
    }

    renderSuggestion(item: FuzzyMatch<PBItem | GroupItem>, el: HTMLElement) {
        super.renderSuggestion(item, el);
        el.innerText = el.innerText.split('|||')[0]
        this.updateSuggestionElWithDesc(item, el);
    }

    updateSuggestionElWithDesc(item: FuzzyMatch<PBItem | GroupItem>, el: HTMLElement) {
        if (item.item.desc) {
            var indicatorEl = el.createEl('div', { text: item.item.desc, cls: 'PB-Desc' });
        }
    }

    onChooseItem(item: PBItem | GroupItem, evt: MouseEvent | KeyboardEvent): void {

        if (item.phraseType) {
            if (!evt.shiftKey) {
                new PBPhrasesFuzzySuggestModal(this.app, this.plugin, (item as PBItem).phrases, this.settings).open()
            } else {
                const randI = Math.floor(Math.random() * ((item as PBItem).phrases.length - 1))
                const randPhrase = (item as PBItem).phrases[randI]
                try {
                    this.close()
                    const activeView = getActiveView(this.plugin);
                    const activeEditor = activeView.editor;
                    const editorRange = activeEditor.getCursor('from')
                    activeEditor.replaceRange(randPhrase, editorRange)
                } catch (error) {
                    console.log(error)
                }
            }
        } else if (item.name) {
            console.log(item.name)
            const filteredPB = this.pb.filter(pbItem => pbItem.groups.some(group => group.name === item.name))
            console.log({ filteredPB })
            this.close()
            new PBPhraseTypeFuzzySuggestModal(this.app, this.plugin, filteredPB, this.settings).open()
        }
    }
}