export class Song{
    constructor(
        public _id: string | undefined,
        public number: number,
        public name: string,
        public duration: string,
        public file: string,
        public album: string
    ){}
}