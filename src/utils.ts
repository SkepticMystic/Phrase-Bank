import { MarkdownView } from "obsidian";
import PhraseBankPlugin from "src/main";

export function getActiveView(plugin: PhraseBankPlugin): MarkdownView {
    return plugin.app.workspace.getActiveViewOfType(MarkdownView);
}