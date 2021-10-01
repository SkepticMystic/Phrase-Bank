import { MarkdownView } from "obsidian";
import PBPlugin from "src/main";

export function getActiveView(plugin: PBPlugin): MarkdownView {
    return plugin.app.workspace.getActiveViewOfType(MarkdownView);
}

export function removeDuplicates(...arrs: any[]) {
    return [...new Set([...arrs])]
}