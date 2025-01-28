export declare type Poll = {
    id: string
    title: string;
    ending: Date
    options: Option[]
}

declare type Option = {
    id: string
    name: string 
    votes: string[]
}