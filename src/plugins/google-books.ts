import axios from "axios";

export default class GoogleLibrary {
	async define(bookName: string) {
		const result = await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${bookName}`,
		);
		return result.data;
	}
}
