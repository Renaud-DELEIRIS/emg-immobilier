import { type NextApiRequest } from "next";

export const getIpFromRequest = (req: NextApiRequest) => {
  let ip;
  if (req.headers["x-forwarded-for"]) {
    if (Array.isArray(req.headers["x-forwarded-for"])) {
      ip = req.headers["x-forwarded-for"][0];
    } else {
      ip = req.headers["x-forwarded-for"].split(",")[0];
    }
  } else if (req.headers["x-real-ip"]) {
    ip = req.socket.remoteAddress;
  } else {
    ip = req.socket.remoteAddress;
  }
  return ip;
};
