import fs from "fs";

const safeDelete = (link: string) => {
  try {
    if (!link || !fs.existsSync(link)) return;
    fs.unlinkSync(link);
  } catch (err: any) {
    console.log(err);
  }
};

export default safeDelete;
