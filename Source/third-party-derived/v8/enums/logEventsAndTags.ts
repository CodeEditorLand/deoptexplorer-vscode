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

import { V8Version } from "#core/v8Version.js";
import { VersionedEnum } from "#core/versionedEnum.js";

// https://github.com/v8/v8/blob/5ecb5bd9785ae9713089826db8f8ab4f5b68172e/src/logging/log.cc#L57
export enum LogEventsAndTags {
	// https://github.com/v8/v8/blob/0aacfb2a6ecbeda1d1d97ca113afd8253a1b9670/src/logging/code-events.h#L32
	// from LOG_EVENTS_LIST
	CODE_CREATION_EVENT = 0,
	CODE_DISABLE_OPT_EVENT = 1,
	CODE_MOVE_EVENT = 2,
	CODE_DELETE_EVENT = 3,
	CODE_MOVING_GC = 4,
	SHARED_FUNC_MOVE_EVENT = 5,
	SNAPSHOT_CODE_NAME_EVENT = 6,
	TICK_EVENT = 7,

	// https://github.com/v8/v8/blob/0aacfb2a6ecbeda1d1d97ca113afd8253a1b9670/src/logging/code-events.h#L43
	// from TAGS_LIST
	BUILTIN_TAG = 8,
	CALLBACK_TAG = 9,
	EVAL_TAG = 10,
	FUNCTION_TAG = 11,
	HANDLER_TAG = 12,
	BYTECODE_HANDLER_TAG = 13,
	LAZY_COMPILE_TAG = 14,
	REG_EXP_TAG = 15,
	SCRIPT_TAG = 16,
	STUB_TAG = 17,
	NATIVE_FUNCTION_TAG = 18,
	NATIVE_LAZY_COMPILE_TAG = 19,
	NATIVE_SCRIPT_TAG = 20,
}

const enumVersions = new VersionedEnum<LogEventsAndTags>("LogEventsAndTags", {
	"*": [
		// https://github.com/v8/v8/blob/0aacfb2a6ecbeda1d1d97ca113afd8253a1b9670/src/logging/code-events.h#L32
		// from LOG_EVENTS_LIST
		[LogEventsAndTags.CODE_CREATION_EVENT, "code-creation"],
		[LogEventsAndTags.CODE_DISABLE_OPT_EVENT, "code-disable-optimization"],
		[LogEventsAndTags.CODE_MOVE_EVENT, "code-move"],
		[LogEventsAndTags.CODE_DELETE_EVENT, "code-delete"],
		[LogEventsAndTags.CODE_MOVING_GC, "code-moving-gc"],
		[LogEventsAndTags.SHARED_FUNC_MOVE_EVENT, "sfi-move"],
		[LogEventsAndTags.SNAPSHOT_CODE_NAME_EVENT, "snapshot-code-name"],
		[LogEventsAndTags.TICK_EVENT, "tick"],

		// https://github.com/v8/v8/blob/0aacfb2a6ecbeda1d1d97ca113afd8253a1b9670/src/logging/code-events.h#L43
		// from TAGS_LIST
		[LogEventsAndTags.BUILTIN_TAG, "Builtin"],
		[LogEventsAndTags.CALLBACK_TAG, "Callback"],
		[LogEventsAndTags.EVAL_TAG, "Eval"],
		[LogEventsAndTags.FUNCTION_TAG, "Function"],
		[LogEventsAndTags.HANDLER_TAG, "Handler"],
		[LogEventsAndTags.BYTECODE_HANDLER_TAG, "BytecodeHandler"],
		[LogEventsAndTags.LAZY_COMPILE_TAG, "LazyCompile"],
		[LogEventsAndTags.REG_EXP_TAG, "RegExp"],
		[LogEventsAndTags.SCRIPT_TAG, "Script"],
		[LogEventsAndTags.STUB_TAG, "Stub"],
		[LogEventsAndTags.NATIVE_FUNCTION_TAG, "Function"],
		[LogEventsAndTags.NATIVE_LAZY_COMPILE_TAG, "LazyCompile"],
		[LogEventsAndTags.NATIVE_SCRIPT_TAG, "Script"],
	],
});

export function getLogEventsAndTags(value: number, version = V8Version.MAX) {
	return enumVersions.toEnum(value, version);
}

export function formatLogEventsAndTags(
	value: LogEventsAndTags,
	version = V8Version.MAX,
) {
	return enumVersions.formatEnum(value, version);
}

export function parseLogEventsAndTags(value: string, version = V8Version.MAX) {
	return enumVersions.parseEnum(value, version);
}
