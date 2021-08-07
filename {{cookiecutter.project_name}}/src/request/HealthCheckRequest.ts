import { IsString, Length } from 'class-validator';

export default class HealthCheckRequest {
  constructor(rawBody: string) {
    const body = JSON.parse(rawBody);
    this.message = body.message;
  }

  @IsString()
  @Length(6, 100)
  message!: string;
}
