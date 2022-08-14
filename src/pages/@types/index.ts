export interface Status {
	name: string;
	class: string;
	count: number;
}

export interface Feedback {
	id: string;
	title: string;
	category: string;
	details: string;
	status: string;
	author: string;
	commentsCount: number;
	votes: number;
}

export interface Author {
	id: string;
	name: string;
	username: string;
	profilePicture: string;
}

export interface IndividualComment {
	content: string;
	author: Author;
	date: string;
}