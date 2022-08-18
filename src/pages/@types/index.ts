export interface Status {
	name: string;
	class: string;
	count: number;
}

export interface Author {
	id: string;
	name: string;
	username: string;
	profilePicture: string;
}

export interface IndividualComment {
	id: string;
	content: string;
	author: Author;
	date: string;
}