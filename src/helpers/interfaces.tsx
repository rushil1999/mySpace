import React from "react";

// export interface BoxInterface {
//   id?: string | undefined;
//   name?: string | number | Array<string>;
//   description?: string | number | Array<string>;
//   files?: Array<String> | number | string;
//   category?: Array<String> | number | string;
//   timestamp?: Array<String> | number | string;
//   imgUrl?: Array<String> | number | string;
// }

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

export interface ToDoInterface {
  description: string;
  dueDate: Date;
  title: string;
  priority: string;
  status: number;
}
