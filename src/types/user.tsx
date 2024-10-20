import { ReactNode } from "react";

interface UserElement {
    path : string,
    element:ReactNode,
    children?: UserElement[],
}

export type {UserElement}