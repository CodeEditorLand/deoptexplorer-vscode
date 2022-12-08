// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file manages the various context values used in commands and views for `enablement` and `when` clauses.
 */

import { corresponds, distinct, identity, orderBy } from "@esfx/iter-fn";
import { Disposable, ExtensionContext } from "vscode";
import {
    contextKeys,
    kDefaultShowNativeCodeProfileNodes,
    kDefaultShowNodeJsProfileNodes,
    kDefaultLogStatus,
    kDefaultShowMaps,
    kDefaultMapSortMode,
    kDefaultProfileShowMode,
    kDefaultProfileSortMode,
    kDefaultShowDecorations,
    kDefaultShowLineTicks,
    LogStatus,
    ShowMaps as ShowMaps,
    MapSortMode,
    ProfileShowMode,
    ProfileSortMode,
    ShowDecorations,
    kDefaultShowJustMyCode,
    kDefaultShowNodeModulesProfileNodes,
    GroupMaps,
    kDefaultGroupMaps,
} from "../constants";
import * as storage from "./storage";
import { typeSafeExecuteCommand } from "../vscode/commands";
import { emitters } from "./events";

let currentContext: ExtensionContext | undefined;

export let logStatus = kDefaultLogStatus;
export let sortMaps = kDefaultMapSortMode;
export let groupMaps = kDefaultGroupMaps;
export let showMaps = kDefaultShowMaps;
export let sortProfile = kDefaultProfileSortMode;
export let showProfile = kDefaultProfileShowMode;
export let showJustMyCode = kDefaultShowJustMyCode;
export let showNativeCodeProfileNodes = kDefaultShowNativeCodeProfileNodes;
export let showNodeJsProfileNodes = kDefaultShowNodeJsProfileNodes;
export let showNodeModulesProfileNodes = kDefaultShowNodeModulesProfileNodes;
export let showDecorations = kDefaultShowDecorations;
export let showLineTicks = kDefaultShowLineTicks;

function setContext(key: string, value: any) {
    return typeSafeExecuteCommand("setContext", key, value);
}

export async function setLogStatus(value: LogStatus) {
    if (logStatus !== value) {
        if (currentContext) {
            emitters.willLogStatusChange();
        }
        logStatus = value;
        if (currentContext) {
            await setContext(contextKeys.logStatus, value);
            emitters.didLogStatusChange(value);
        }
    }
}

export async function setSortMaps(value: MapSortMode) {
    if (sortMaps !== value) {
        if (currentContext) {
            emitters.willSortMapsChange();
        }
        sortMaps = value;
        if (currentContext) {
            await Promise.all([
                storage.setSortMaps(value),
                setContext(contextKeys.sortMaps, value)
            ]);
            emitters.didSortMapsChange(value);
        }
    }
}

export async function setGroupMaps(value: readonly GroupMaps[]) {
    if (groupMaps !== value) {
        if (value.length > 1) {
            value = [...orderBy(distinct(value), identity)];
        }
        if (!corresponds(groupMaps, value)) {
            if (currentContext) {
                emitters.willGroupMapsChange();
            }
            groupMaps = value;
            if (currentContext) {
                await Promise.all([
                    storage.setGroupMaps(value),
                    setContext(contextKeys.groupMaps, groupMaps.length === 0 ? undefined : groupMaps),
                    setContext(contextKeys.maps.groupByFile, groupMaps.includes(GroupMaps.ByFile)),
                    setContext(contextKeys.maps.groupByFunction, groupMaps.includes(GroupMaps.ByFunction)),
                ]);
                emitters.didGroupMapsChange(value);
            }
        }
    }
}

export async function setShowMaps(value: readonly ShowMaps[]) {
    if (showMaps !== value) {
        if (value.length > 1) {
            value = [...orderBy(distinct(value), identity)];
        }
        if (!corresponds(showMaps, value)) {
            if (currentContext) {
                emitters.willShowMapsChange();
            }
            showMaps = value;
            if (currentContext) {
                await Promise.all([
                    storage.setShowMaps(value),
                    setContext(contextKeys.showMaps, value.length === 0 ? undefined : value),
                    setContext(contextKeys.maps.showUnreferenced, showMaps.includes(ShowMaps.Unreferenced)),
                    setContext(contextKeys.maps.showNonUserCode, showMaps.includes(ShowMaps.NonUserCode)),
                    setContext(contextKeys.maps.showTransitions, showMaps.includes(ShowMaps.Transitions)),
                ]);
                emitters.didShowMapsChange(value);
            }
        }
    }
}

export async function setSortProfile(value: ProfileSortMode) {
    if (sortProfile !== value) {
        if (currentContext) {
            emitters.willSortProfileChange();
        }
        sortProfile = value;
        if (currentContext) {
            await setContext(contextKeys.sortProfile, value);
            emitters.didSortProfileChange(value);
        }
    }
}

export async function setShowProfile(value: ProfileShowMode) {
    if (showProfile !== value) {
        if (currentContext) {
            emitters.willShowProfileChange();
        }
        showProfile = value;
        if (currentContext) {
            await setContext(contextKeys.showProfile, value);
            emitters.didShowProfileChange(value);
        }
    }
}

export async function setShowProfileJustMyCode(value: boolean) {
    if (showJustMyCode !== value) {
        if (currentContext) {
            emitters.willShowProfileJustMyCodeChange();
        }
        showJustMyCode = value;
        if (currentContext) {
            await Promise.all([
                storage.setShowJustMyCode(value),
                setContext(contextKeys.showProfileJustMyCode, value)
            ]);
            emitters.didShowProfileJustMyCodeChange(value);
        }
    }
}

export async function setShowNativeCodeProfileNodes(value: boolean) {
    if (showNativeCodeProfileNodes !== value) {
        if (currentContext) {
            emitters.willShowNativeCodeProfileNodesChange();
        }
        showNativeCodeProfileNodes = value;
        if (currentContext) {
            await setContext(contextKeys.showNativeCodeProfileNodes, value);
            emitters.didShowNativeCodeProfileNodesChange(value);
        }
    }
}

export async function setShowNodeJsProfileNodes(value: boolean) {
    if (showNodeJsProfileNodes !== value) {
        if (currentContext) {
            emitters.willShowNodeJsProfileNodesChange();
        }
        showNodeJsProfileNodes = value;
        if (currentContext) {
            await setContext(contextKeys.showNodeJsProfileNodes, value);
            emitters.didShowNodeJsProfileNodesChange(value);
        }
    }
}

export async function setShowNodeModulesProfileNodes(value: boolean) {
    if (showNodeModulesProfileNodes !== value) {
        if (currentContext) {
            emitters.willShowNodeModulesProfileNodesChange();
        }
        showNodeModulesProfileNodes = value;
        if (currentContext) {
            await setContext(contextKeys.showNodeModulesProfileNodes, value);
            emitters.didShowNodeModulesProfileNodesChange(value);
        }
    }
}

export async function setShowDecorations(value: readonly ShowDecorations[]) {
    if (showDecorations !== value) {
        if (value.length > 1) {
            value = [...orderBy(distinct(value), identity)];
        }
        if (!corresponds(showDecorations, value)) {
            if (currentContext) {
                emitters.willShowDecorationsChange();
            }
            showDecorations = value;
            if (currentContext) {
                await Promise.all([
                    setContext(contextKeys.showDecorations, value.length === 0 ? undefined : value),
                    setContext(contextKeys.decorations.showDeopts, showDecorations.includes(ShowDecorations.Deopts)),
                    setContext(contextKeys.decorations.showICs, showDecorations.includes(ShowDecorations.ICs)),
                    setContext(contextKeys.decorations.showFunctionState, showDecorations.includes(ShowDecorations.Functions)),
                    setContext(contextKeys.decorations.showProfiler, showDecorations.includes(ShowDecorations.Profiler)),
                    setContext(contextKeys.decorations.showLineTicks, showDecorations.includes(ShowDecorations.LineTicks)),
                ]);
                emitters.didShowDecorationsChange(value);
            }
        }
    }
}

export async function setShowLineTicks(value: boolean) {
    if (showLineTicks !== value) {
        if (currentContext) {
            emitters.willShowLineTicksChange();
        }
        showLineTicks = value;
        if (currentContext) {
            await setContext(contextKeys.showLineTicks, value);
            emitters.didShowLineTicksChange(value);
        }
    }
}

export async function activateContextService(context: ExtensionContext) {
    currentContext = context;
    showJustMyCode = storage.getShowJustMyCode();
    showNativeCodeProfileNodes = storage.getShowNativeCodeProfileNodes();
    showNodeJsProfileNodes = storage.getShowNodeJsProfileNodes();
    showNodeModulesProfileNodes = storage.getShowNodeModulesProfileNodes();
    groupMaps = storage.getGroupMaps();
    showMaps = storage.getShowMaps();
    sortMaps = storage.getSortMaps();
    await Promise.all([
        setContext(contextKeys.decorations.showDeopts, showDecorations.includes(ShowDecorations.Deopts)),
        setContext(contextKeys.decorations.showICs, showDecorations.includes(ShowDecorations.ICs)),
        setContext(contextKeys.decorations.showFunctionState, showDecorations.includes(ShowDecorations.Functions)),
        setContext(contextKeys.decorations.showProfiler, showDecorations.includes(ShowDecorations.Profiler)),
        setContext(contextKeys.decorations.showLineTicks, showDecorations.includes(ShowDecorations.LineTicks)),
        setContext(contextKeys.maps.showUnreferenced, showMaps.includes(ShowMaps.Unreferenced)),
        setContext(contextKeys.maps.showNonUserCode, showMaps.includes(ShowMaps.NonUserCode)),
        setContext(contextKeys.maps.showTransitions, showMaps.includes(ShowMaps.Transitions)),
        setContext(contextKeys.maps.groupByFile, groupMaps.includes(GroupMaps.ByFile)),
        setContext(contextKeys.maps.groupByFunction, groupMaps.includes(GroupMaps.ByFunction)),
        setContext(contextKeys.logStatus, logStatus),
        setContext(contextKeys.sortMaps, sortMaps),
        setContext(contextKeys.groupMaps, groupMaps.length === 0 ? undefined : groupMaps),
        setContext(contextKeys.showMaps, showMaps.length === 0 ? undefined : showMaps),
        setContext(contextKeys.sortProfile, sortProfile),
        setContext(contextKeys.showProfile, showProfile),
        setContext(contextKeys.showProfileJustMyCode, showJustMyCode),
        setContext(contextKeys.showNativeCodeProfileNodes, showNativeCodeProfileNodes),
        setContext(contextKeys.showNodeJsProfileNodes, showNodeJsProfileNodes),
        setContext(contextKeys.showNodeModulesProfileNodes, showNodeModulesProfileNodes),
        setContext(contextKeys.showDecorations, showDecorations.length === 0 ? undefined : showDecorations),
        setContext(contextKeys.showLineTicks, showLineTicks),
    ]);
    return new Disposable(() => {
        logStatus = kDefaultLogStatus;
        sortMaps = kDefaultMapSortMode;
        groupMaps = kDefaultGroupMaps;
        showMaps = kDefaultShowMaps;
        sortMaps = kDefaultMapSortMode;
        sortProfile = kDefaultProfileSortMode;
        showProfile = kDefaultProfileShowMode;
        showJustMyCode = kDefaultShowJustMyCode;
        showNativeCodeProfileNodes = kDefaultShowNativeCodeProfileNodes;
        showNodeJsProfileNodes = kDefaultShowNodeJsProfileNodes;
        showNodeModulesProfileNodes = kDefaultShowNodeModulesProfileNodes;
        showDecorations = kDefaultShowDecorations;
        showLineTicks = kDefaultShowLineTicks;
        currentContext = undefined;
    });
}
