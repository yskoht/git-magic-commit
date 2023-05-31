#!/usr/bin/env node
import meow from "meow";

import { gitMagicCommit } from "./git-magic-commit.js";

const cli = meow(
	`
	Usage
	  $ git-magic-commit

	Options
		--verbose Show verbose output
`,
	{
		importMeta: import.meta,
		flags: {
			verbose: {
				type: "boolean",
				default: false,
			},
		},
	},
);

gitMagicCommit({
	verbose: cli.flags.verbose,
});
