export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type Video = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    youtubeid: string;
    date: Date;
    fav: boolean;
}