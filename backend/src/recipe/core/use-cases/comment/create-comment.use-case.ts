import { IComment } from '../../interfaces/comment/comment.interface';
import { ICommentrepository } from '../../interfaces/repositories/comment.repository';
import { CommentMapper } from '../../mappers/comment.mappes';

export class CreateCommentUseCase {
  constructor(private commentRepository: ICommentrepository) {}

  async execute(dto: IComment): Promise<IComment> {
    const commentData = CommentMapper.toEntity(dto);
    const createdComment = await this.commentRepository.create(commentData);
    return CommentMapper.toDTO(createdComment);
  }
}
