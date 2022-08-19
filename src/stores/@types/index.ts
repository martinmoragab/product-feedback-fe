export interface User {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	products: Array<Object>;
}

export interface Product {
  _id: string;
  name: string;
  feedbacks: Feedback[];
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