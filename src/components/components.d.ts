export interface User {
    username?: string,
    amountOfChirps?: number,
    pic?: string
}



export interface Content {
    type: 'text' | 'picture'
    content: string
}

export interface ChirpItem {
    id: number,
    user: string,
    textcontent: string,
    imagecontent: {[key: number]: string}
}



