import { OpenAI } from "langchain/llms/openai";
import {
	loadSummarizationChain,
	loadQAStuffChain,
	AnalyzeDocumentChain,
} from "langchain/chains";
import { Document } from "langchain/document";

import { generateDiff } from "./generateDiff.js";
import { postProcess } from "./utils.js";
import { CreateCommitMessage, Option } from "./types.js";

async function summarize(diff: string, opt: Option): Promise<string> {
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
	summary: string,
	question: string,
	opt: Option,
): Promise<string> {
	const docs = [new Document({ pageContent: summary })];
	const model = new OpenAI({ temperature: 0, verbose: opt.verbose });
	const chain = loadQAStuffChain(model);
	const result = await chain.call({
		input_documents: docs,
		question,
	});
	const commitMessage = result.text as string;
	return commitMessage;
}

export const createCommitMessage: CreateCommitMessage = async (
	question,
	opt,
) => {
	const diff = await generateDiff();
	const summary = await summarize(diff, opt);
	const subject = await createSubject(summary, question, opt);
	return {
		subject: postProcess(subject),
		body: postProcess(summary),
	};
};
