const inputNormalize = command =>
	command
		.trim()
		.toLowerCase()
		.replace(/\s{1,}/g, ' ');
export default inputNormalize;
