const verbose = true;
//const verbose = false;

import { q } from "./utils.js";
import { createCommitMessage } from "./createCommitMessage.js";

const question = q(`
	Generate a git commit message of 50 characters or less
`);

async function main() {
	const result = await createCommitMessage(question, { verbose });
	console.log({ result });
}

main();
