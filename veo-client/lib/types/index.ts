declare type Poll = {
    id: string
    title: string;
    ending: Date
    optons: Option[]
}

declare type Option = {
    name: string 
    votes: string[]
}