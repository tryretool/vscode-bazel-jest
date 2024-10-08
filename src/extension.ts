import * as vscode from "vscode";
import { CodeLensProvider } from "./CodeLensProvider";
import { runTestFromCodeLens, runTestsInFile } from "./commands";
import { Instruction } from "./instruction";
import { TestSpec } from "./utils/spec";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("bazel-jest is now active");

  const registerTextEditorCommand = vscode.commands.registerTextEditorCommand;

  // Register Commands
  const commands = [
    registerTextEditorCommand("bazel-jest.runTestsInFile", (editor: vscode.TextEditor) => {
      runTestsInFile(editor, Instruction.Test);
    }),
    registerTextEditorCommand("bazel-jest.watchTestsInFile", (editor: vscode.TextEditor) => {
      runTestsInFile(editor, Instruction.Watch);
    }),
    registerTextEditorCommand("bazel-jest.debugTest", (editor: vscode.TextEditor) => {
      runTestsInFile(editor, Instruction.Debug);
    }),
    registerTextEditorCommand("bazel-jest.runTest", (editor: vscode.TextEditor, _edit, spec: TestSpec) => {
      runTestFromCodeLens(editor, spec, Instruction.Test);
    }),
    registerTextEditorCommand("bazel-jest.watchTest", (editor: vscode.TextEditor, _edit, spec: TestSpec) => {
      runTestFromCodeLens(editor, spec, Instruction.Watch);
    }),
  ];

  const codeLensProvider = new CodeLensProvider();
  vscode.languages.registerCodeLensProvider(codeLensProvider.selector, codeLensProvider);

  context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
  // noop
}
