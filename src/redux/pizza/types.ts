export type SearchPizzaParams = {
    category: string;
    search:string;
    sortBy:string;
    currentPage:string;
}

// Record<string, string>

export type TPizza = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes:number[];
    price: number;
    category: number;
    rating: number;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

export interface IPizzaSliceState {
    items: TPizza[];
    status: Status;
}

