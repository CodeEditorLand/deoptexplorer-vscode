// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Disposable, type ExtensionContext } from "vscode";
import { activateTreeViewService } from "./treeViews";

export async function activateTreeViews(context: ExtensionContext) {
	return Disposable.from(await activateTreeViewService(context));
}
