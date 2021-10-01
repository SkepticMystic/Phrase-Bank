import { MarkdownView } from "obsidian";
import PBPlugin from "src/main";

export function getActiveView(plugin: PBPlugin): MarkdownView {
    return plugin.app.workspace.getActiveViewOfType(MarkdownView);
}

export function removeDuplicates<T>(a: T[]) {
    var result: T[] = [];
    a.forEach((item) => {
        if (result.indexOf(item) < 0) {
            result.push(item);
        }
    });
    return result
}