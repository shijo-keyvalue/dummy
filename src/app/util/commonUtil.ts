import APP_CONSTANTS from "../constants";
import { Request } from "express";

const isNonEmptyArray = (input: any) => {
  return Array.isArray(input) && input.length > 0;
};

export { isNonEmptyArray };
