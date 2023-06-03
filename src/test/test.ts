import fs from "fs";

import * as utils from "../lib/utils.js";

import createCommitMessage from "../create-commit-message.js";
import createCommitMessage2 from "../create-commit-message2.js";

function loadDiff(fileName: string) {
	return fs.readFileSync(fileName, "utf-8");
}

const question = utils.createQuestion(`
	Generate a concise and appropriate Git commit message.
	Please answer the message only in English, no more than 50 characters.
`);

type Result = {
	hash: string;
	commitMessage: string;
	commitMessage2: string;
};

function writeCsv(result: Result[]) {
	function escapeDoubleQuote(str: string) {
		return str.replace(/"/g, '""');
	}

	const csv: string[] = [];
	csv.push("hash,commitMessage,commitMessage2");

	result.forEach(({ hash, commitMessage, commitMessage2 }) => {
		csv.push(
			`"${hash}","${escapeDoubleQuote(commitMessage)}","${escapeDoubleQuote(
				commitMessage2,
			)}"`,
		);
	});

	fs.writeFileSync("./result.csv", csv.join("\n"), "utf-8");
}

describe("", () => {
	const result: Result[] = [];
	afterAll(() => {
		writeCsv(result);
	});

	test.each([
		"0c5249a",
		"0d10618",
		"2eed54e",
		"5df895e",
		"9a09395",
		"86c2af1",
		"3667a2f",
		"a59d28a",
		"ada9951",
		"f50f006",
	])("%s", async (hash: string) => {
		const diff = loadDiff(`./src/test/fixture/${hash}.diff`);

		const [commitMessage, commitMessage2] = await Promise.all([
			createCommitMessage({ diff, question }, { verbose: false }),
			createCommitMessage2({ diff, question }, { verbose: false }),
		]);

		result.push({
			hash,
			commitMessage,
			commitMessage2,
		});
	});
});
