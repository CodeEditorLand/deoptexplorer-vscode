// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type TreeView, window } from "vscode";
import * as constants from "../../constants";
import type { ProfileViewNodeSnapshot } from "../../model/profileViewNodeSnapshot";
import type { BaseNode } from "../common/baseNode";
import { LineTickTreeDataProvider } from "./lineTickTreeDataProvider";

export class LineTickTree {
	private provider: LineTickTreeDataProvider;
	private treeView: TreeView<BaseNode>;

	constructor() {
		this.provider = new LineTickTreeDataProvider();
		this.treeView = window.createTreeView(constants.treeviews.lineTicks, {
			treeDataProvider: this.provider,
			showCollapseAll: false,
		});
	}

	setProfileViewNodeSnapshot(snapshot: ProfileViewNodeSnapshot | undefined) {
		this.provider.suspendUpdates();
		this.provider.node = snapshot;
		this.provider.resumeUpdates();
		this.updateTreeViewHeader();
	}

	dispose() {
		this.treeView.dispose();
	}

	private updateTreeViewHeader() {
		this.treeView.description = this.provider.node
			? this.provider.node.entry.functionName.name
			: undefined;
	}
}
