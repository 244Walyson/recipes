import { IComment } from '../../interfaces/comment/comment.interface';
import { ICommentrepository } from '../../interfaces/repositories/comment.repository';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';

export class FindCommentByRecipeIdUseCase {
  constructor(private readonly commentrepository: ICommentrepository) {}

  async execute({
    recipeId,
    page,
    limit,
  }: {
    recipeId: string;
    page: number;
    limit: number;
  }): Promise<IPaginatedResponse<IComment>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const comments = await this.commentrepository.findCommentByRecipeId({
      recipeId,
      offset,
      limit: numericLimit,
    });

    return {
      data: comments.data,
      page: page,
      limit: limit,
      total: comments.total,
    };
  }
}
