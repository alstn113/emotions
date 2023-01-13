import { AuthGuard } from '@nestjs/passport';

export class GithubGuard extends AuthGuard('github') {
  constructor() {
    super();
  }
}
