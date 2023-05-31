import { OpenAI } from "langchain/llms/openai";
import { AnalyzeDocumentChain, loadQARefineChain } from "langchain/chains";

import * as git from "./lib/git.js";
import { postProcess } from "./lib/utils.js";
import { CreateCommitMessage, Option } from "./lib/types.js";

async function createSubject(
	diff: string,
	question: string,
	opt: Option,
): Promise<string> {
	const model = new OpenAI({ temperature: 0, verbose: opt.verbose });
	const chain = new AnalyzeDocumentChain({
		combineDocumentsChain: loadQARefineChain(model),
		verbose: opt.verbose,
	});
	const result = await chain.call({
		input_document: diff,
		question,
	});
	const subject = result.output_text as string;
	return subject;
}

export const createCommitMessage: CreateCommitMessage = async (
	question,
	opt,
) => {
	const diff = await git.diff();
	const subject = await createSubject(diff, question, opt);
	return {
		subject: postProcess(subject),
	};
};