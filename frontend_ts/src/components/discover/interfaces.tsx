
export interface IComment{
    user: string,
    comment: string
}

export interface IBook {
    _id: string,
    title: string,
    wikiId: string,
    freebaseID: string,
    author: string,
    geners: string,
    image: string,
    plot: string,
    comments: IComment[]
    publication: string
}

export interface IRecommandationList {
    title: string;
    similarBooks: IBook[];
}
