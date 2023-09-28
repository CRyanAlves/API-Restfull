import { Request, Response } from 'express';
import CreateSessionService from '../service/CreateSessionService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async createSession(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const user = await createSession.execute({ email, password });

    return res.json(instanceToInstance(user))
  }
}
