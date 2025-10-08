import axios from "axios";

export default class OpenLibrary {
	async define(bookName: string) {
		const result = await axios.get(
			`https://openlibrary.org/search.json?q=${bookName}`,
		);
		return result.data;
	}
}
