import { $, ExecaSyncReturnValue } from "execa";

export async function generateDiff(): Promise<string> {
	const { stdout: diff }: ExecaSyncReturnValue = await $`git diff --staged`;
	return diff;
}