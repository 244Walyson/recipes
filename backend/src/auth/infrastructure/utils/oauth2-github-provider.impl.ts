import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { UserRequestDto } from 'src/user/infrastructure/dto/user-request.dto';

@Injectable()
export class PassportGithubStrategy extends PassportStrategy(
  GitHubStrategy,
  'github',
) {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const user = new UserRequestDto({
      email: profile.emails?.[0]?.value ?? profile.username,
      name: profile.displayName,
      imgUrl: profile.photos[0]?.value ?? '',
      username: profile.username,
    });

    return user;
  }
}
