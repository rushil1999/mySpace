import React from "react";

export interface BoxInterface {
  id: string;
  name: string;
  description: string;
}

export interface ToDoInterface {
  description: string;
  dueDate: Date;
  title: string;
  priority: string;
  status: number;
}
