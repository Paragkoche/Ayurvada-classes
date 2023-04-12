import { Request, Response } from "express";
export interface ctx {
  req: Request;
  res: Response;
}
