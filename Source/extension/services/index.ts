// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Disposable, ExtensionContext } from "vscode";

import { activateCanonicalPaths } from "./canonicalPaths";
import { activateContextService } from "./context";
import { activateCurrentLogFileService } from "./currentLogFile";
import { activateEventsService } from "./events";
import { activateOperationManagerService } from "./operationManager";
import { activateStateManager } from "./stateManager";
import { activateStorageService } from "./storage";

export async function activateCoreServices(context: ExtensionContext) {
	return Disposable.from(
		activateEventsService(context),
		activateOperationManagerService(context),
		activateStorageService(context), // NOTE: Storage service must come before context service.
		activateCurrentLogFileService(context),
		await activateContextService(context),
		activateStateManager(context),
		activateCanonicalPaths(context),
	);
}
