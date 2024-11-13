import { IComment } from '../../interfaces/comment/comment.interface';
import { ICommentrepository } from '../../interfaces/repositories/comment.repository';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';

export class FindCommentByRecipeIdUseCase {
  constructor(private readonly commentrepository: ICommentrepository) {}

  async execute(
    recipeId: string,
    pageable: { page: number; limit: number },
  ): Promise<IPaginatedResponse<IComment>> {
    const comments = await this.commentrepository.findCommentsByRecipeId(
      recipeId,
      {
        page: pageable.page,
        limit: pageable.limit,
      },
    );
    return {
      data: comments.data,
      page: pageable.page,
      limit: pageable.limit,
      total: comments.total,
    };
  }
}
