export type Option = {
	verbose: boolean;
};

type ReturnCreateCommitMessage = {
	subject: string;
	body?: string;
};

export type CreateCommitMessage = (
	question: string,
	opt: Option,
) => Promise<ReturnCreateCommitMessage>;
