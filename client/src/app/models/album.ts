export class Album{
    constructor(
        public _id: string | undefined,
        public title: string,
        public description: string,
        public year: number,
        public image: string,
        public artist: string

    ){}
}