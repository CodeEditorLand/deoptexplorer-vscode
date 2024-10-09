// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Disposable, ExtensionContext } from "vscode";

import { activateFunctionHistoryWebview } from "./functionHistory";
import { activateLogOverviewWebview } from "./logOverview";
import { activateReportWebview } from "./report";

export function activateWebviews(context: ExtensionContext) {
	return Disposable.from(
		activateReportWebview(context),
		activateFunctionHistoryWebview(context),
		activateLogOverviewWebview(context),
	);
}
