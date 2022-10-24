export interface Status {
	name: string;
	class: string;
	count: number;
}

export interface Product {
  name: string;
  mainColor: string;
  webpage: string;
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

export interface FeedbackParams {
	title: string;
	category: string;
	details: string;
	product: string;
  status?: string;
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