import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './interfaces/jwt-payload.interface';

export class JwtService {
  static sign(payload: JwtPayload) {
    return sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
