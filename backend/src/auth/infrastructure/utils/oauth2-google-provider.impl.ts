import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserRequestDto } from 'src/user/infrastructure/dto/user-request.dto';

@Injectable()
export class PassportGoogleStrategy extends PassportStrategy(
  GoogleStrategy,
  'google',
) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const user = new UserRequestDto({
      email: profile.emails[0].value,
      name: profile.displayName,
      imgUrl: profile.photos[0]?.value,
      username: profile.name.givenName,
    });

    return user;
  }
}
