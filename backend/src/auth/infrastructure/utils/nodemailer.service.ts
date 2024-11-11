import { Injectable } from '@nestjs/common';
import {
  IEmailService,
  ImailData,
} from 'src/auth/core/interfaces/recover-password/email-service.interface';

@Injectable()
export class NodeMailerService implements IEmailService {
  send(data: ImailData): Promise<void> {
    console.log(data);
    return;
  }
}
