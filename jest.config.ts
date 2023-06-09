import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
	testEnvironment: "node",
	preset: "ts-jest/presets/default-esm", // or other ESM presets
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	transform: {
		// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},
	testPathIgnorePatterns: ["./dist"],
	testTimeout: 1 * 60 * 1000,
};

export default jestConfig;
