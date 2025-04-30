export type JwtPayload = {
  username: string;
  sub: string;
};

export abstract class TokenGeneratorPort {
  abstract sign(payload: JwtPayload): string;
}
