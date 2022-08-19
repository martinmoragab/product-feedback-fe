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
  date: string;
}