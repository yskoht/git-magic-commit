import { OpenAI } from "langchain/llms/openai";
import {
	loadSummarizationChain,
	loadQAStuffChain,
	AnalyzeDocumentChain,
} from "langchain/chains";
import { Document } from "langchain/document";

import * as git from "./lib/git.js";
import * as utils from "./lib/utils.js";
import * as types from "./lib/types.js";

const DIFF_MAX_LENGTH = 2000;

async function summarize(diff: string, opt: types.Option): Promise<string> {
	const model = new OpenAI({ temperature: 0, verbose: opt.verbose });
	const chain = new AnalyzeDocumentChain({
		combineDocumentsChain: loadSummarizationChain(model),
		verbose: opt.verbose,
	});
	const result = await chain.call({
		input_document: diff,
	});
	const summary = result.text as string;
	return summary;
}

async function createSubject(
	diff: string,
	summary: string,
	question: string,
	opt: types.Option,
): Promise<string> {
	const pageContent = diff.length < DIFF_MAX_LENGTH ? diff : summary;
	const docs = [new Document({ pageContent })];
	const model = new OpenAI({ temperature: 0, verbose: opt.verbose });
	const chain = loadQAStuffChain(model);
	const result = await chain.call({
		input_documents: docs,
		question,
	});
	const commitMessage = result.text as string;
	return commitMessage;
}

const createCommitMessage: types.CreateCommitMessage = async (
	question,
	opt,
) => {
	const diff = await git.diff();
	const summary = await summarize(diff, opt);
	const subject = await createSubject(diff, summary, question, opt);
	return {
		subject: utils.postProcess(subject),
		body: utils.postProcess(summary),
	};
};

export default createCommitMessage;
