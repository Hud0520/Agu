import { Product } from "./product";

export interface Page {
    "content" : Product[],
    "size" : number,
    "totalPages": number,
    "number" : number,
    "last": boolean,
    "frist": boolean,
}
