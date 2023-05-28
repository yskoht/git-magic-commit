export type Option = {
	verbose: boolean;
};

export type CommitMessage = {
	subject: string;
	body?: string;
};

export type CreateCommitMessage = (
	question: string,
	opt: Option,
) => Promise<CommitMessage>;
