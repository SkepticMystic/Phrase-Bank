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

var PBPhrasesFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(PBPhrasesFuzzySuggestModal, _super);
    function PBPhrasesFuzzySuggestModal(app, phrases, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
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
        console.log(item);
    };
    return PBPhrasesFuzzySuggestModal;
}(obsidian.FuzzySuggestModal));

var PBSectionFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(PBSectionFuzzySuggestModal, _super);
    function PBSectionFuzzySuggestModal(app, pb, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
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
        this.updateSuggestionElForMode(item, el);
    };
    PBSectionFuzzySuggestModal.prototype.updateSuggestionElForMode = function (item, el) {
        var indicatorEl = createEl('div', { text: item.item.desc, cls: 'PB-Desc' });
        el.insertAdjacentElement('afterbegin', indicatorEl);
    };
    PBSectionFuzzySuggestModal.prototype.onChooseItem = function (item, evt) {
        console.log(item.section);
        new PBPhrasesFuzzySuggestModal(this.app, item.phrases, this.settings).open();
    };
    return PBSectionFuzzySuggestModal;
}(obsidian.FuzzySuggestModal));

var PBSettingsTab = /** @class */ (function (_super) {
    __extends(PBSettingsTab, _super);
    function PBSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    PBSettingsTab.prototype.display = function () {
        var _this = this;
        var _a = this.plugin, settings = _a.settings, saveSettings = _a.saveSettings;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Phrase Bank' });
        new obsidian.Setting(containerEl)
            .addText(function (text) {
            text.setValue(settings.pbFilePath).onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            settings.pbFilePath = value;
                            return [4 /*yield*/, saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return PBSettingsTab;
}(obsidian.PluginSettingTab));

var DEFAULT_SETTINGS = {
    pbFilePath: ''
};
var PhraseBankPlugin = /** @class */ (function (_super) {
    __extends(PhraseBankPlugin, _super);
    function PhraseBankPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhraseBankPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currFile, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('Loading Metadataframe plugin');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _c.sent();
                        this.addCommand({
                            id: 'write-metadataframe',
                            name: 'Write Metadataframe',
                            callback: function () { return new PBSectionFuzzySuggestModal(_this.app, _this.pb, _this.settings).open(); }
                        });
                        this.addSettingTab(new PBSettingsTab(this.app, this));
                        currFile = this.app.vault.getAbstractFileByPath('Phrase Bank.md');
                        _a = this;
                        _b = this.mdToJSON;
                        return [4 /*yield*/, this.app.vault.cachedRead(currFile)];
                    case 2:
                        _a.pb = _b.apply(this, [_c.sent()]);
                        console.log(this.pb);
                        return [2 /*return*/];
                }
            });
        });
    };
    PhraseBankPlugin.prototype.mdToJSON = function (content) {
        var lines = content.split('\n');
        var pb = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.startsWith('## ')) {
                var section = line.slice(3);
                pb.push({ section: section, desc: '', keywords: [], phrases: [] });
            }
            else if (line.trim() !== '') {
                pb.last().phrases.push(line);
            }
        }
        return pb;
    };
    PhraseBankPlugin.prototype.refreshPB = function () {
        // this.mdToJSON(pbFile)
    };
    PhraseBankPlugin.prototype.onunload = function () {
        console.log('unloading plugin');
    };
    PhraseBankPlugin.prototype.loadSettings = function () {
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
    PhraseBankPlugin.prototype.saveSettings = function () {
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
    return PhraseBankPlugin;
}(obsidian.Plugin));

module.exports = PhraseBankPlugin;
