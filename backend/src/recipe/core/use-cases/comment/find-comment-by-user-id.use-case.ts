import { IComment } from '../../interfaces/comment/comment.interface';
import { ICommentrepository } from '../../interfaces/repositories/comment.repository';
import { IPaginatedResponse } from '../../interfaces/shared/paginated-response.interface';

export class FindCommentByUserIdUseCase {
  constructor(private readonly commentrepository: ICommentrepository) {}

  async execute(
    userId: string,
    pageable: { page: number; limit: number },
  ): Promise<IPaginatedResponse<IComment>> {
    const comments = await this.commentrepository.findCommentByUserId(userId, {
      page: pageable.page,
      limit: pageable.limit,
    });
    return {
      data: comments.data,
      page: pageable.page,
      limit: pageable.limit,
      total: comments.total,
    };
  }
}
