import { $, ExecaSyncReturnValue } from "execa";

import { CommitMessage } from "./types.js";

export async function commit({ subject, body }: CommitMessage): Promise<void> {
	const _body = body ? `\n\n${body}` : "";
	const _result: ExecaSyncReturnValue =
		await $`git commit -m ${subject}${_body}`;
}
