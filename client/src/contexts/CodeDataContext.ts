import { createContext, useState } from "react";
import { CodeData } from "../types/CodeData";

export const CodeDataContext = createContext(useState(new CodeData()));