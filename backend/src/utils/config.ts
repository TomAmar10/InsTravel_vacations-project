import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 10000;

export const config = {
  server: {
    port,
  },
};
