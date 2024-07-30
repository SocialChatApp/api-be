import { PartialType } from '@nestjs/mapped-types';
import { CreateReplyDto } from './create-comment-reply-dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) { }
