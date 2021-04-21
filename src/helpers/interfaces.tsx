export interface BoxInterface {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  assets?: Array<string>;
  createdAt?: number;
  updatedAt?: number;
  imgUrl?: string;
}

export interface AssetInterface {
  id?: string;
  name?: string;
  content?: string;
}

export interface ToDoInterface {
  description: string;
  dueDate: Date;
  title: string;
  priority: string;
  status: number;
}

export interface UserInterface {
  email: string,
  password: string,
}