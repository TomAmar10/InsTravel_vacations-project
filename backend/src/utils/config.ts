import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 1337;

export const config = {
  server: {
    port,
  },
};
