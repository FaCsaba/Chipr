export interface User {
    username: string,
    amountOfChirps: number,
    pic: string
}

export interface Content {
    type: 'text' | 'picture'
    content: string
}

export interface ChirpItem {
    user: string,
    content: Content
}



