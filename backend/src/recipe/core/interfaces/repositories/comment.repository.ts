import { Comment } from '../../entities/comment.entity';
import { IComment } from '../comment/comment.interface';

export interface ICommentrepository {
  create(comment: Comment): Promise<IComment>;
  findCommentByRecipeId({
    recipeId,
    offset,
    limit,
  }: {
    recipeId: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: IComment[] }>;
  findCommentByUserId({
    userId,
    offset,
    limit,
  }: {
    userId: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: IComment[] }>;
  update(comment: Comment): Promise<IComment>;
  inactivate(commentId: string): Promise<void>;
}
