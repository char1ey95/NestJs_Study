import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
    @Prop({ required: true, unique: true })
    boardid: number;

    @Prop({ required: true })
    userid: string;

    @Prop({ required: true })
    subject: string;

    @Prop({ required: true })
    content: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);