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

function getActiveView(plugin) {
    return plugin.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
}

var PBPhrasesFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(PBPhrasesFuzzySuggestModal, _super);
    function PBPhrasesFuzzySuggestModal(app, plugin, phrases, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.plugin = plugin;
        _this.phrases = phrases;
        _this.settings = settings;
        return _this;
    }
    PBPhrasesFuzzySuggestModal.prototype.getItems = function () {
        return this.phrases;
    };
    PBPhrasesFuzzySuggestModal.prototype.getItemText = function (item) {
        return item;
    };
    PBPhrasesFuzzySuggestModal.prototype.renderSuggestion = function (item, el) {
        _super.prototype.renderSuggestion.call(this, item, el);
    };
    PBPhrasesFuzzySuggestModal.prototype.onChooseItem = function (item, evt) {
        try {
            var activeView = getActiveView(this.plugin);
            var activeEditor = activeView.editor;
            var editorRange = activeEditor.getCursor('from');
            activeEditor.replaceRange(item, editorRange);
        }
        catch (error) {
            console.log(error);
        }
    };
    return PBPhrasesFuzzySuggestModal;
}(obsidian.FuzzySuggestModal));

var PBSectionFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(PBSectionFuzzySuggestModal, _super);
    function PBSectionFuzzySuggestModal(app, plugin, pb, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.plugin = plugin;
        _this.pb = pb;
        _this.settings = settings;
        return _this;
    }
    PBSectionFuzzySuggestModal.prototype.getItems = function () {
        return this.pb;
    };
    PBSectionFuzzySuggestModal.prototype.getItemText = function (item) {
        return item.section;
    };
    PBSectionFuzzySuggestModal.prototype.renderSuggestion = function (item, el) {
        _super.prototype.renderSuggestion.call(this, item, el);
        this.updateSuggestionElWithDesc(item, el);
    };
    PBSectionFuzzySuggestModal.prototype.updateSuggestionElWithDesc = function (item, el) {
        el.createEl('div', { text: item.item.desc, cls: 'PB-Desc' });
    };
    PBSectionFuzzySuggestModal.prototype.onChooseItem = function (item, evt) {
        console.log(item.section);
        if (!evt.shiftKey) {
            new PBPhrasesFuzzySuggestModal(this.app, this.plugin, item.phrases, this.settings).open();
        }
        else {
            var randI = Math.round(Math.random() * (item.phrases.length - 1));
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
    };
    return PBSectionFuzzySuggestModal;
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
        var _a = this.plugin, settings = _a.settings, saveSettings = _a.saveSettings;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Phrase Bank' });
        new obsidian.Setting(containerEl)
            .setName('Phrase Bank file path')
            .setDesc('Path to your phrase bank.md file in your vault.')
            .addText(function (text) { return text
            .setValue(settings.pbFilePath)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Secret: ' + value);
                        settings.pbFilePath = value;
                        return [4 /*yield*/, saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
    };
    return PBSettingTab;
}(obsidian.PluginSettingTab));

var DEFAULT_SETTINGS = {
    pbFilePath: ''
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
                            callback: function () { return new PBSectionFuzzySuggestModal(_this.app, _this, _this.pb, _this.settings).open(); }
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
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.refreshPB()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    PBPlugin.prototype.mdToJSON = function (content) {
        var _a;
        var lines = content.split('\n');
        var pb = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.startsWith('## ')) {
                // A new heading indicates a new section in the pb
                var section = line.slice(3);
                pb.push({ section: section, desc: '', keywords: [], phrases: [] });
            }
            else if (line.startsWith('> ')) {
                // Blockquotes indicate description
                pb.last().desc = line.slice(2);
            }
            else if (line.startsWith('- ')) {
                // Bullets indicates keywords
                var kws = line.slice(2).split(',');
                (_a = pb.last().keywords).push.apply(_a, kws);
            }
            else if (line.trim() !== '') {
                // Every other non-blank line is considered a phrase
                pb.last().phrases.push(line);
            }
        }
        return pb;
    };
    PBPlugin.prototype.refreshPB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pbFilePathNorm, pbFile, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.settings.pbFilePath === '') {
                            new obsidian.Notice('Please enter a path to the phrase bank.md file');
                            return [2 /*return*/];
                        }
                        pbFilePathNorm = obsidian.normalizePath(this.settings.pbFilePath);
                        pbFile = this.app.vault.getAbstractFileByPath(pbFilePathNorm);
                        return [4 /*yield*/, this.app.vault.cachedRead(pbFile)];
                    case 1:
                        content = _a.sent();
                        this.pb = this.mdToJSON(content);
                        new obsidian.Notice('Phrase Bank Refreshed!');
                        console.log({ pb: this.pb, pbFilePathNorm: pbFilePathNorm, pbFile: pbFile });
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
