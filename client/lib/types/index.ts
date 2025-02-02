export declare type Poll = {
    id: string
    title: string;
    ending: number[]
    options: Option[]
}

declare type Option = {
    id: string
    name: string 
    votes: string[]
}