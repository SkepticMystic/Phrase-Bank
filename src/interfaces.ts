export type PBItem = {
    fileName: string,
    phraseType: string,
    groups: GroupItem[],
    desc: string,
    keywords: string[],
    phrases: string[]
}

export type GroupItem = {
    name: string;
    keywords: string[];
}