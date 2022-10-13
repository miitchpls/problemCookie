import Bluebird from "bluebird";
import { Request, Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { ApiService } from "../services/api.service";

export const LoginController = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password)
    res.status(422).send({
      message: "missing parameters",
    });

  const client: IgApiClient = await ApiService.getClient(req.body.username);

  Bluebird.try(async () => {
    await client.account.login(req.body.username, req.body.password);

    performLogin(client, req, res);
  }).catch((err) => {
    console.error(err);
    res.status(400).send(err);
  });
};

async function performLogin(
  client: IgApiClient,
  req: Request,
  res: Response
): Promise<void> {
  const serialized = await client.state.serialize();

  // Removing unnecessary information from the state.
  delete serialized.constants;
  delete serialized.supportedCapabilities;

  // Parsing cookies.
  serialized.cookies = JSON.parse(serialized.cookies);

  res.cookie("state", JSON.stringify(serialized), {
    maxAge: 31536000, // one-year
  });
  res.cookie("seed", req.body.username, {
    maxAge: 31536000, // one-year
  });

  // Removing cookies once their are saved in response.
  delete serialized.cookies;

  res.status(200).send(serialized);
}
