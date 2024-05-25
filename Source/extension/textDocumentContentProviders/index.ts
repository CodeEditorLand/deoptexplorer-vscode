// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Disposable, type ExtensionContext } from "vscode";
import { activateMapTextDocumentContentProvider } from "./map";

export function activateTextDocumentContentProviders(
	context: ExtensionContext,
) {
	return Disposable.from(activateMapTextDocumentContentProvider(context));
}
