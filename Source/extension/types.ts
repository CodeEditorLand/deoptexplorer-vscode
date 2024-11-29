// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KnownType } from "#core/serializer.js";
import type * as vscode from "vscode";

import type { ContextCommandHandler } from "./commands";

declare const invalid: unique symbol;

export interface invalid<T, M = "Invalid type"> {
	[invalid]: [T, M];
}

declare const elaboration: unique symbol;

export interface elaboration<A, B> {
	[elaboration]: [A, B];
}

declare const ok: unique symbol;
type ok = typeof ok;

export type CommandArgumentObject<T, K extends keyof T = keyof T> =
	// Infer result to `infer R`
	[
		// distribute check each argument of T
		K extends keyof T
			? // values that match CommandArgumentValue are Ok
				T[K] extends CommandArgumentValue
				? ok
				: // values that match functions are invalid.
					T[K] extends
							| ((...args: any) => any)
							| (abstract new (...args: any) => any)
					? K
					: // values that match `object` are ok if they are simple.
						T[K] extends object
						? T[K] extends CommandArgumentObject<T[K]>
							? ok
							: K
						: K
			: // end distribution of `K extends keyof T`
				never,
	] extends [infer R]
		? [R] extends [ok]
			? // If R only contains `Ok`, then we return the source type T
				T
			: // Otherwise, we return an invalid type marker.
				invalid<
					T,
					elaboration<"Property cannot be serialized", Exclude<R, ok>>
				>
		: // end inference to `infer R`
			never;

export type CommandArgumentValue =
	| string
	| number
	| bigint // converted to { $type: "bigint", value: string }
	| boolean
	| null
	| undefined
	| { toJSON(): unknown } // converted via .toJSON
	| RegExp // converted to { $mid: 2, source, flags }, see https://github.com/microsoft/vscode/blob/54d33cf14cf6c0e86880b5b74a5a3628de42bce9/src/vs/base/common/marshalling.ts#L53
	| vscode.Uri // handled by https://github.com/microsoft/vscode/blob/54d33cf14cf6c0e86880b5b74a5a3628de42bce9/src/vs/base/common/marshalling.ts#L52
	| vscode.Position // converted to { line, column }
	| vscode.Range // converted to { start: { line, column }, end: { line, column } }
	| KnownType // from global KnownTypes and KnownSerializers registries.
	| ContextCommandHandler
	| readonly CommandArgumentValue[]
	| { readonly [key: string]: CommandArgumentValue }; // placeholder for inferred CommandArgumentObject

export type AsCommandArgumentValue<T> = T extends CommandArgumentValue
	? T
	: T extends CommandArgumentObject<T>
		? T
		: invalid<T, "Type not serializable">;

export const enum CharacterCodes {
	nullCharacter = 0,
	maxAsciiCharacter = 0x7f,

	lineFeed = 0x0a, // \n
	carriageReturn = 0x0d, // \r
	lineSeparator = 0x2028,
	paragraphSeparator = 0x2029,
	nextLine = 0x0085,

	// Unicode 3.0 space characters
	space = 0x0020, // " "
	nonBreakingSpace = 0x00a0, //
	enQuad = 0x2000,
	emQuad = 0x2001,
	enSpace = 0x2002,
	emSpace = 0x2003,
	threePerEmSpace = 0x2004,
	fourPerEmSpace = 0x2005,
	sixPerEmSpace = 0x2006,
	figureSpace = 0x2007,
	punctuationSpace = 0x2008,
	thinSpace = 0x2009,
	hairSpace = 0x200a,
	zeroWidthSpace = 0x200b,
	narrowNoBreakSpace = 0x202f,
	ideographicSpace = 0x3000,
	mathematicalSpace = 0x205f,
	ogham = 0x1680,

	_ = 0x5f,
	$ = 0x24,

	_0 = 0x30,
	_1 = 0x31,
	_2 = 0x32,
	_3 = 0x33,
	_4 = 0x34,
	_5 = 0x35,
	_6 = 0x36,
	_7 = 0x37,
	_8 = 0x38,
	_9 = 0x39,

	a = 0x61,
	b = 0x62,
	c = 0x63,
	d = 0x64,
	e = 0x65,
	f = 0x66,
	g = 0x67,
	h = 0x68,
	i = 0x69,
	j = 0x6a,
	k = 0x6b,
	l = 0x6c,
	m = 0x6d,
	n = 0x6e,
	o = 0x6f,
	p = 0x70,
	q = 0x71,
	r = 0x72,
	s = 0x73,
	t = 0x74,
	u = 0x75,
	v = 0x76,
	w = 0x77,
	x = 0x78,
	y = 0x79,
	z = 0x7a,

	A = 0x41,
	B = 0x42,
	C = 0x43,
	D = 0x44,
	E = 0x45,
	F = 0x46,
	G = 0x47,
	H = 0x48,
	I = 0x49,
	J = 0x4a,
	K = 0x4b,
	L = 0x4c,
	M = 0x4d,
	N = 0x4e,
	O = 0x4f,
	P = 0x50,
	Q = 0x51,
	R = 0x52,
	S = 0x53,
	T = 0x54,
	U = 0x55,
	V = 0x56,
	W = 0x57,
	X = 0x58,
	Y = 0x59,
	Z = 0x5a,

	ampersand = 0x26, // &
	asterisk = 0x2a, // *
	at = 0x40, // @
	backslash = 0x5c, // \
	backtick = 0x60, // `
	bar = 0x7c, // |
	caret = 0x5e, // ^
	closeBrace = 0x7d, // }

	closeBracket = 0x5d, // ]
	closeParen = 0x29, // )
	colon = 0x3a, // :
	comma = 0x2c, // ,
	dot = 0x2e, // .
	doubleQuote = 0x22, // "
	equals = 0x3d, // =
	exclamation = 0x21, // !
	greaterThan = 0x3e, // >
	hash = 0x23, // #
	lessThan = 0x3c, // <
	minus = 0x2d, // -
	openBrace = 0x7b, // {
	openBracket = 0x5b, // [
	openParen = 0x28, // (
	percent = 0x25, // %
	plus = 0x2b, // +
	question = 0x3f, // ?
	semicolon = 0x3b, // ;

	singleQuote = 0x27, // '
	slash = 0x2f, // /
	tilde = 0x7e, // ~

	backspace = 0x08, // \b
	formFeed = 0x0c, // \f
	byteOrderMark = 0xfeff,
	tab = 0x09, // \t
	verticalTab = 0x0b, // \v
}
