// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeoptEntry } from "#deoptigate/deoptEntry.js";
import type { FunctionEntry } from "#deoptigate/functionEntry.js";
import type { IcEntry } from "#deoptigate/icEntry.js";

/**
 * Contains everything we know about a file (except for profile events)
 */
export interface FileEntry {
	functions: FunctionEntry[];
	ics: IcEntry[];
	deopts: DeoptEntry[];
}
