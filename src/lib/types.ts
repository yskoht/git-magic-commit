export type CommitMessage = string;

export type Params = {
	diff: string;
	question: string;
};

export type Option = {
	verbose: boolean;
};

export type CreateCommitMessage = (
	params: Params,
	opt: Option,
) => Promise<CommitMessage>;
