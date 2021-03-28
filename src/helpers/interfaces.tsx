import React from "react";

export interface BoxInterface {
  id?: string;
  name?: string;
  description?: string;
  files?: Array<String>;
  category?: string;
  timestamp?: number;
  imgUrl?: string;
}
