'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function getActiveView(plugin) {
    return plugin.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
}
function removeDuplicates(a) {
    var result = [];
    a.forEach(function (item) {
        if (result.indexOf(item) < 0) {
            result.push(item);
        }
    });
    return result;
}

var PBPhrasesFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(PBPhrasesFuzzySuggestModal, _super);
    function PBPhrasesFuzzySuggestModal(app, plugin, phrases, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.plugin = plugin;
        _this.phrases = __spreadArray(__spreadArray([], phrases, true), ['BACK'], false);
        _this.settings = settings;
        return _this;
    }
    PBPhrasesFuzzySuggestModal.prototype.getItems = function () {
        return this.phrases;
    };
    PBPhrasesFuzzySuggestModal.prototype.getItemText = function (item) {
        return "\uD83D\uDCAC " + item;
    };
    PBPhrasesFuzzySuggestModal.prototype.renderSuggestion = function (item, el) {
        _super.prototype.renderSuggestion.call(this, item, el);
    };
    PBPhrasesFuzzySuggestModal.prototype.onChooseItem = function (item, evt) {
        if (item === 'BACK') {
            this.close();
            new PBPhraseTypeOrGroupsFuzzySuggestModal(this.app, this.plugin, this.plugin.pb, this.settings).open();
        }
        else {
            try {
                var activeView = getActiveView(this.plugin);
                var activeEditor = activeView.editor;
                var editorRange = activeEditor.getCursor('from');
                activeEditor.replaceRange(item, editorRange);
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    return PBPhrasesFuzzySuggestModal;
}(obsidian.FuzzySuggestModal));

var PBPhraseTypeFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(PBPhraseTypeFuzzySuggestModal, _super);
    function PBPhraseTypeFuzzySuggestModal(app, plugin, pb, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.plugin = plugin;
        _this.pb = __spreadArray(__spreadArray([], pb, true), [{ phraseType: 'BACK', fileName: '', desc: '', groups: [], keywords: [], phrases: [] }], false);
        _this.settings = settings;
        _this.scope.register(['Shift'], 'Enter', function (evt) {
            // @ts-ignore
            _this.chooser.useSelectedItem(evt);
            return false;
        });
        return _this;
    }
    PBPhraseTypeFuzzySuggestModal.prototype.getItems = function () {
        return this.pb;
    };
    PBPhraseTypeFuzzySuggestModal.prototype.getItemText = function (item) {
        return item.phraseType + '|||' + item.keywords.join(', ') + ', ' + item.fileName;
    };
    PBPhraseTypeFuzzySuggestModal.prototype.renderSuggestion = function (item, el) {
        _super.prototype.renderSuggestion.call(this, item, el);
        el.innerText = el.innerText.split('|||')[0];
        this.updateSuggestionElWithDesc(item, el);
    };
    PBPhraseTypeFuzzySuggestModal.prototype.updateSuggestionElWithDesc = function (item, el) {
        if (item.item.desc) {
            el.createEl('div', { text: item.item.desc, cls: 'PB-Desc' });
        }
    };
    PBPhraseTypeFuzzySuggestModal.prototype.onChooseItem = function (item, evt) {
        if (item.phraseType === 'BACK') {
            this.close();
            new PBPhraseTypeOrGroupsFuzzySuggestModal(this.app, this.plugin, this.plugin.pb, this.settings).open();
        }
        else {
            if (!evt.shiftKey) {
                this.close();
                new PBPhrasesFuzzySuggestModal(this.app, this.plugin, item.phrases, this.settings).open();
            }
            else {
                var randI = Math.floor(Math.random() * (item.phrases.length - 1));
                var randPhrase = item.phrases[randI];
                try {
                    this.close();
                    var activeView = getActiveView(this.plugin);
                    var activeEditor = activeView.editor;
                    var editorRange = activeEditor.getCursor('from');
                    activeEditor.replaceRange(randPhrase, editorRange);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    };
    return PBPhraseTypeFuzzySuggestModal;
}(obsidian.FuzzySuggestModal));

var PBPhraseTypeOrGroupsFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(PBPhraseTypeOrGroupsFuzzySuggestModal, _super);
    function PBPhraseTypeOrGroupsFuzzySuggestModal(app, plugin, pb, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.plugin = plugin;
        _this.pb = pb;
        _this.settings = settings;
        _this.scope.register(['Shift'], 'Enter', function (evt) {
            // @ts-ignore
            _this.chooser.useSelectedItem(evt);
            return false;
        });
        return _this;
    }
    PBPhraseTypeOrGroupsFuzzySuggestModal.prototype.getItems = function () {
        var groups = this.pb.map(function (item) { return item.groups; }).flat(3);
        var noDupGroups = [];
        groups.forEach(function (group) {
            if (!noDupGroups.some(function (g) { return g.name === group.name; })) {
                noDupGroups.push(group);
            }
        });
        return __spreadArray(__spreadArray([], noDupGroups, true), this.pb, true);
    };
    PBPhraseTypeOrGroupsFuzzySuggestModal.prototype.getItemText = function (item) {
        if (item.phraseType) {
            return item.phraseType + '|||' + item.keywords.join(', ') + ', ' + item.fileName;
        }
        else if (item.name) {
            return '📂 ' + item.name;
        }
    };
    PBPhraseTypeOrGroupsFuzzySuggestModal.prototype.renderSuggestion = function (item, el) {
        _super.prototype.renderSuggestion.call(this, item, el);
        el.innerText = el.innerText.split('|||')[0];
        this.updateSuggestionElWithDesc(item, el);
    };
    PBPhraseTypeOrGroupsFuzzySuggestModal.prototype.updateSuggestionElWithDesc = function (item, el) {
        if (item.item.desc) {
            el.createEl('div', { text: item.item.desc, cls: 'PB-Desc' });
        }
    };
    PBPhraseTypeOrGroupsFuzzySuggestModal.prototype.onChooseItem = function (item, evt) {
        if (item.phraseType) {
            if (!evt.shiftKey) {
                new PBPhrasesFuzzySuggestModal(this.app, this.plugin, item.phrases, this.settings).open();
            }
            else {
                var randI = Math.floor(Math.random() * (item.phrases.length - 1));
                var randPhrase = item.phrases[randI];
                try {
                    this.close();
                    var activeView = getActiveView(this.plugin);
                    var activeEditor = activeView.editor;
                    var editorRange = activeEditor.getCursor('from');
                    activeEditor.replaceRange(randPhrase, editorRange);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else if (item.name) {
            console.log(item.name);
            var filteredPB = this.pb.filter(function (pbItem) { return pbItem.groups.some(function (group) { return group.name === item.name; }); });
            console.log({ filteredPB: filteredPB });
            this.close();
            new PBPhraseTypeFuzzySuggestModal(this.app, this.plugin, filteredPB, this.settings).open();
        }
    };
    return PBPhraseTypeOrGroupsFuzzySuggestModal;
}(obsidian.FuzzySuggestModal));

var PBSettingTab = /** @class */ (function (_super) {
    __extends(PBSettingTab, _super);
    function PBSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    PBSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var _a = this.plugin, settings = _a.settings; _a.saveSettings;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Phrase Bank' });
        new obsidian.Setting(containerEl)
            .setName('Phrase Bank file names')
            .setDesc('Names of your phrase bank.md files in your vault. You can also enter a comma-separated list of pb.md filenames, and the plugin will merge them into one global PB')
            .addText(function (tc) {
            tc.setValue(settings.pbFileNames.join(', '));
            tc.inputEl.onblur = function () { return __awaiter(_this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = tc.inputEl.value;
                            settings.pbFileNames = value.split(',').map(function (path) { return path.trim(); });
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.plugin.refreshPB()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
        });
        new obsidian.Setting(containerEl)
            .setName('Use Remote Phrase Bank')
            .setDesc('Use the content of the community-maintaned PB from: https://raw.githubusercontent.com/SkepticMystic/Phrase-Bank/main/Phrase%20Bank%20copy.md')
            .addToggle(function (tg) {
            tg
                .setValue(settings.useRemotePB)
                .onChange(function (val) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            settings.useRemotePB = val;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.plugin.refreshPB()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return PBSettingTab;
}(obsidian.PluginSettingTab));

var DEFAULT_SETTINGS = {
    pbFileNames: [''],
    useRemotePB: false
};
var PBPlugin = /** @class */ (function (_super) {
    __extends(PBPlugin, _super);
    function PBPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PBPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Loading PhraseBank plugin');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addCommand({
                            id: 'phrase-bank-suggestor',
                            name: 'Pick from Phrase Bank',
                            callback: function () { return new PBPhraseTypeOrGroupsFuzzySuggestModal(_this.app, _this, _this.pb, _this.settings).open(); }
                        });
                        this.addCommand({
                            id: 'refresh-phrase-bank',
                            name: 'Refresh Phrase Bank',
                            callback: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.refreshPB()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        });
                        this.addSettingTab(new PBSettingTab(this.app, this));
                        // this.refreshPB()
                        // this.pb = JSON.parse(readFileSync('C:\\Users\\rossk\\OneDrive\\1D Personal\\Programming\\Obsidian Plugins\\PB Vault\\.obsidian\\plugins\\Phrase-Bank\\phrasebank.json', 'utf-8'))
                        this.pb = [];
                        this.app.workspace.onLayoutReady(function () { return __awaiter(_this, void 0, void 0, function () {
                            var resp, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, fetch('https://raw.githubusercontent.com/SkepticMystic/Phrase-Bank/main/Phrase%20Databases/Phrase_Bank_refnwrite_and_manchester%20copy.md')];
                                    case 1:
                                        resp = _b.sent();
                                        _a = this;
                                        return [4 /*yield*/, resp.text()];
                                    case 2:
                                        _a.remotePBmd = _b.sent();
                                        return [4 /*yield*/, this.refreshPB()];
                                    case 3:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    PBPlugin.prototype.mdToJSON = function (content, fileName) {
        var _a;
        var lines = content.split('\n');
        var pb = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (pb.length === 0 && !line.startsWith('### ')) ;
            else if (line.startsWith('### ')) {
                // A new heading indicates a new section in the pb
                var section = line.slice(4);
                pb.push({
                    fileName: fileName,
                    phraseType: section,
                    groups: [],
                    desc: '',
                    keywords: [],
                    phrases: []
                });
            }
            else if (line.startsWith('!') || line.startsWith('↑')) {
                // Groups start with '!' or '↑'
                var groups = line.split(/!|↑/)[1].trim().split(',');
                groups.forEach(function (group) {
                    pb.last().groups.push({ name: group.trim(), keywords: [] });
                });
            }
            else if (line.startsWith('>')) {
                // Blockquotes indicate description
                pb.last().desc = line.split('>')[1].trim();
            }
            else if (line.startsWith('- ')) {
                // Bullets indicates keywords
                var kws = line.slice(2).split(',').map(function (kw) { return kw.trim(); });
                (_a = pb.last().keywords).push.apply(_a, kws);
            }
            else if (line.startsWith('%%')) ;
            else if (line.startsWith('|')) ;
            else if (line.trim() !== '') {
                // Every other non-blank line is considered a phrase
                pb.last().phrases.push(line);
            }
        }
        return pb;
    };
    PBPlugin.prototype.mergePBs = function (localPBs) {
        var globalPB = [];
        localPBs.forEach(function (localPB) {
            localPB.forEach(function (pbItem) {
                var existingI = globalPB.findIndex(function (pb) { return pb.phraseType === pbItem.phraseType; });
                if (existingI > -1) {
                    globalPB[existingI].phrases = removeDuplicates(__spreadArray(__spreadArray([], globalPB[existingI].phrases, true), pbItem.phrases, true));
                    globalPB[existingI].keywords = removeDuplicates(__spreadArray(__spreadArray([], globalPB[existingI].keywords, true), pbItem.keywords, true));
                    // globalPB[existingPBSection].phrases.push(...pbItem.phrases)
                    // globalPB[existingPBSection].keywords.push(...pbItem.keywords)
                    if (globalPB[existingI].desc === '') {
                        globalPB[existingI].desc = pbItem.desc;
                    }
                    if (globalPB[existingI].fileName !== pbItem.fileName) {
                        globalPB[existingI].fileName = globalPB[existingI].fileName + (" " + pbItem.fileName);
                    }
                }
                else {
                    globalPB.push(__assign({}, pbItem));
                }
            });
        });
        return globalPB;
    };
    PBPlugin.prototype.buildLocalPBs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localPBs, currFile, _i, _a, path, pbFile, content, localPB;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        localPBs = [];
                        currFile = this.app.workspace.getActiveFile();
                        _i = 0, _a = this.settings.pbFileNames;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        path = _a[_i];
                        if (path === '')
                            return [2 /*return*/];
                        pbFile = this.app.metadataCache.getFirstLinkpathDest(path, currFile.path);
                        if (!pbFile) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.app.vault.cachedRead(pbFile)];
                    case 2:
                        content = _b.sent();
                        localPB = this.mdToJSON(content, pbFile.basename);
                        console.log({ localPB: localPB });
                        localPBs.push(localPB);
                        return [3 /*break*/, 4];
                    case 3:
                        new obsidian.Notice(path + " does not exist in your vault.");
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        console.log({ localPBs: localPBs });
                        return [2 /*return*/, localPBs];
                }
            });
        });
    };
    PBPlugin.prototype.buildRemotePB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var remotePBItemArr;
            return __generator(this, function (_a) {
                if (this.settings.useRemotePB) {
                    remotePBItemArr = this.mdToJSON(this.remotePBmd, 'REMOTE');
                    return [2 /*return*/, remotePBItemArr];
                }
                return [2 /*return*/, []];
            });
        });
    };
    PBPlugin.prototype.refreshPB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localPBs, remotePB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.settings.pbFileNames[0] === '' && !this.settings.useRemotePB) {
                            new obsidian.Notice('Please enter a path to the phrase bank.md file, or enable the setting to use the remote PB.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.buildLocalPBs()];
                    case 1:
                        localPBs = _a.sent();
                        return [4 /*yield*/, this.buildRemotePB()];
                    case 2:
                        remotePB = _a.sent();
                        console.log({ localPBs: localPBs, remotePB: remotePB });
                        if (localPBs === null || localPBs === void 0 ? void 0 : localPBs.length) {
                            this.pb = this.mergePBs(__spreadArray(__spreadArray([], localPBs, true), [remotePB], false));
                        }
                        else {
                            this.pb = remotePB;
                        }
                        new obsidian.Notice('Phrase Bank Refreshed!');
                        console.log({ pb: this.pb });
                        return [2 /*return*/];
                }
            });
        });
    };
    PBPlugin.prototype.onunload = function () {
        console.log('unloading plugin');
    };
    PBPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    PBPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PBPlugin;
}(obsidian.Plugin));

module.exports = PBPlugin;
