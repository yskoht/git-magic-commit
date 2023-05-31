#!/usr/bin/env node
import meow from "meow";

import gitMagicCommit from "./git-magic-commit.js";

const cli = meow(
	`
	Usage
		$ git-magic-commit

	Options
		--dry-run  Executes the command without committing changes.
		--silent   Runs the command with no output.
		--verbose  Show verbose output.
		--help     Show this message.
`,
	{
		importMeta: import.meta,
		flags: {
			dryRun: {
				type: "boolean",
				default: false,
			},
			silent: {
				type: "boolean",
				default: false,
			},
			verbose: {
				type: "boolean",
				default: false,
			},
		},
	},
);

gitMagicCommit({
	dryRun: cli.flags.dryRun,
	silent: cli.flags.silent,
	verbose: cli.flags.verbose,
});
