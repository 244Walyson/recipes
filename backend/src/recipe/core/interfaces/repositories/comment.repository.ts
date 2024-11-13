import { Comment } from '../../entities/comment.entity';
import { IComment } from '../comment/comment.interface';

export interface ICommentrepository {
  create(comment: Comment): Promise<IComment>;
  findCommentsByRecipeId(
    recipeId: string,
    pageable: { page: number; limit: number },
  ): Promise<{ data: IComment[]; total: number }>;
  findCommentByUserId(
    userId: string,
    pageable: { page: number; limit: number },
  ): Promise<{ data: IComment[]; total: number }>;
  update(comment: Comment): Promise<IComment>;
  inactivate(commentId: string): Promise<void>;
}
