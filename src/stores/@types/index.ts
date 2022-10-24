export interface User {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	products: Array<Object>;
}

export interface RenderError {
  render: boolean;
  message: string;
}

export interface Product {
	_id: string;
  feedbacks: Feedback[];
  name: string;
  author: string;
  mainColor: string;
  webpage: string;
}

export interface Feedback {
	_id: string;
	title: string;
	category: string;
	details: string;
	status: string;
	author: string;
	product: string;
	votes: object;
	comments: Comment[];
}

export interface Comment {
	content: string;
	_id: string;
	author: User;
	date: string;
}
export interface Roadmap {
	in_progress: number;
	live: number;
	planned: number;
}