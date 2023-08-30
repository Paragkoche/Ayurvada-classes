import type { NextApiRequest, NextApiResponse } from "next";

import aws from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import { v4 } from "uuid";
const s3 = new aws.S3({
  endpoint: new aws.Endpoint("blr1.digitaloceanspaces.com"),
  accessKeyId: "DO00YKWJ9MNTQHTWKCTF",
  secretAccessKey: "PNpdQ6YhYITfZ/6n+CMpbTX4vYdpdLgnMUUxKCYgs6o",
  region: "blr1",
});
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const form = formidable({
      maxFileSize: 200 * 1024 * 1024 * 1024,
    });
    console.log(req.headers);

    form.parse(req, async (err, fields, files) => {
      // console.log(req);

      if (err) return res.status(500).send(err);
      if (!files.video)
        return res
          .status(500)
          .json({ status: 500, message: "no file to uploade" });
      console.log(files.video);

      const file = fs.createReadStream(files.video[0].filepath);
      try {
        let f = v4();
        await s3.putObject(
          {
            Bucket: "video-tanwishlife",
            ACL: "public-read",
            Key: `${f}.mp4`,
            Body: file,
          },
          async (error, data) => {
            return res.send(
              `https://video-tanwishlife.blr1.digitaloceanspaces.com/${f}.mp4`
            );
          }
        );
      } catch (error) {
        return res.status(402).send(error);
      }
    });
  } catch (e) {
    console.log(e);

    return res.status(402).send(e);
  }
}
