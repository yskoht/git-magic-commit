import createCommitMessage from "./create-commit-message.js";

import * as utils from "./lib/utils.js";
import * as git from "./lib/git.js";

const question = utils.q(`
	Generate a concise and appropriate Git commit message.
	Please answer the message only in English, no more than 50 characters.
`);

async function gitMagicCommit({
	dryRun,
	silent,
	verbose,
}: {
	dryRun: boolean;
	silent: boolean;
	verbose: boolean;
}) {
	const diff = await git.diff();

	const commitMessage = await createCommitMessage(
		{ diff, question },
		{ verbose },
	);

	if (!silent) {
		console.log(commitMessage);
	}

	if (!dryRun) {
		await git.commit(commitMessage);
	}
}

export default gitMagicCommit;
