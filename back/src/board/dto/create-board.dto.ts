export class CreateBoardDto {
    public boardid: number;
    public userid: string;
    public subject: string;
    public content: string;

    constructor(boardid: number, userid: string, subject: string, content: string ){
        this.boardid = boardid;
        this.userid = userid;
        this.subject = subject;
        this.content = content;
    }
}
