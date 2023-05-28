const verbose = true;
//const verbose = false;

import { q } from "./utils.js";
import { createCommitMessage } from "./createCommitMessage.js";

const question = q(`
	Generate a concise and appropriate Git commit message.
	Please answer the message only in English, no more than 50 characters.
`);

async function main() {
	const result = await createCommitMessage(question, { verbose });
	console.log({ result });
}

main();
