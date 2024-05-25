// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// THIRD PARTY LICENSE NOTICE:
//
// Portions of this code are sourced from V8:
//
//  Copyright 2012 the V8 project authors. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.v8 file.

import type { Position } from "vscode";
import type { Script } from "#core/script.js";
import { kNoSourcePosition } from "./constants";
import type { SourcePosition } from "./sourcePosition";
import type { SharedFunctionCodeEntry } from "./tools/codeentry";

export class SourcePositionInfo {
	readonly position: Position | undefined;

	constructor(
		public sourcePosition: SourcePosition,
		public shared: SharedFunctionCodeEntry,
		public script: Script | null = null,
	) {
		const name = shared.functionName;
		if (
			script &&
			sourcePosition.isJavaScript &&
			sourcePosition.scriptOffset !== kNoSourcePosition &&
			name.filePosition?.uri
		) {
			this.position = script.lineMap.positionAt(
				sourcePosition.scriptOffset,
			);
		} else if (name.filePosition) {
			this.position = name.filePosition.range.start;
		} else {
			this.position = undefined;
		}
	}
}
