export function q(str: string): string {
	return str.replace(/\n/g, "").trim();
}

export function postProcess(str: string) {
	return str.trim();
}
