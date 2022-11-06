import {IsNumber, IsOptional, Min} from 'class-validator';
import {Type} from "class-transformer";

export class PagingDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    readonly page?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    readonly size?: number = 12;
}
