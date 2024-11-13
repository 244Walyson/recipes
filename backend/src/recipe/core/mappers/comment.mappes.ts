import { Comment } from '../entities/comment.entity';
import { IComment } from '../interfaces/comment/comment.interface';

export class CommentMapper {
  static toEntity(dto: IComment): Comment {
    return new Comment({
      recipeId: dto.recipeId,
      userId: dto.userId,
      content: dto.content,
    });
  }

  static toDTO(entity: Comment): IComment {
    return {
      id: entity.id,
      recipeId: entity.recipeId,
      userId: entity.userId,
      content: entity.content,
      createdAt: entity.createdAt,
    };
  }
}
