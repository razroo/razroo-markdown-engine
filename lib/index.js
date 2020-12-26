"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
require('dotenv').config();
var micromatch = require("micromatch");
var url = require("url");
var a = require("axios");
var yargs = require("yargs/yargs");
var hideBin = require("yargs/helpers").hideBin;
var argv = yargs(hideBin(process.argv)).argv;
var fs = require("fs");
var path = require("path");
var axios = a.create({
    headers: { 'Authorization': "token " + process.env.GITHUB_TOKEN }
});
function replaceSnippets(fileAsArray) {
    return __awaiter(this, void 0, void 0, function () {
        var match, promises, _loop_1, x;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    match = micromatch(fileAsArray, ["*{{**}}*"]);
                    promises = [];
                    _loop_1 = function (x) {
                        var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var indexOfCode, lineNumbers;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        indexOfCode = fileAsArray.indexOf(match[x]);
                                        match[x] = match[x].replace("{{ ", "");
                                        match[x] = match[x].replace(" }}", "");
                                        // we need to work with raw content from github
                                        match[x] = match[x].replace("/blob", "");
                                        match[x] = match[x].replace("github.com", "raw.githubusercontent.com");
                                        lineNumbers = url.parse(match[x]).hash;
                                        //   remove the Ls and #
                                        lineNumbers = lineNumbers.replace("L", "");
                                        lineNumbers = lineNumbers.replace("L", "");
                                        lineNumbers = lineNumbers.replace("#", "");
                                        lineNumbers = lineNumbers.split("-");
                                        //   get the github raw content
                                        return [4 /*yield*/, axios
                                                .get(match[x])
                                                .then(function (response) {
                                                // handle success
                                                var fileArray = response.data.split("\n");
                                                var codeSnippet = fileArray.slice(lineNumbers[0] - 1, lineNumbers[1]);
                                                codeSnippet.unshift("```");
                                                codeSnippet.push("```");
                                                fileAsArray[indexOfCode] = codeSnippet.join("\n");
                                                resolve(codeSnippet);
                                            })
                                                .catch(function (error) {
                                                console.log(error);
                                                reject(error);
                                            })];
                                    case 1:
                                        //   get the github raw content
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        promises.push(promise);
                    };
                    for (x in match) {
                        _loop_1(x);
                    }
                    return [4 /*yield*/, Promise.all(promises).then(function (v) {
                            return fileAsArray;
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.resolveMarkdownFile = function (inputFilePath, outputFilePath) {
    return new Promise(function (resolve, reject) {
        replaceSnippets(fs.readFileSync(inputFilePath, "utf8").split("\n"))
            .then(function (newFileArray) {
            fs.writeFileSync(outputFilePath, newFileArray.join("\n"));
            resolve(outputFilePath);
        })
            .catch(function (error) {
            reject(error);
        });
    });
};
