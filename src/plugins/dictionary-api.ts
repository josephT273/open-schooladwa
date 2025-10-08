import axios from "axios";

export default class Dictionary {
	async define(word: string) {
		const result = await axios.get(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
		);
		return result.data;
	}
}
