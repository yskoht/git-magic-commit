import { $, ExecaSyncReturnValue } from "execa";

import * as types from "./types.js";

export async function diff(): Promise<string> {
	const { stdout: diff }: ExecaSyncReturnValue = await $`git diff --staged`;
	return diff;
}

export async function commit(
	commitMessage: types.CommitMessage,
): Promise<void> {
	const _result: ExecaSyncReturnValue = await $`git commit -m ${commitMessage}`;
}
