import { q } from "./utils.js";
import { createCommitMessage } from "./create-commit-message.js";
import * as git from "./git.js";

const question = q(`
	Generate a concise and appropriate Git commit message.
	Please answer the message only in English, no more than 50 characters.
`);

export async function gitMagicCommit({
	verbose,
}: {
	verbose: boolean;
}) {
	const commitMessage = await createCommitMessage(question, { verbose });
	if (verbose) {
		console.log({ commitMessage });
	}

	await git.commit(commitMessage);
}
