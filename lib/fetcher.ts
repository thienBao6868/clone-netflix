
import { User } from "@prisma/client";
import axios from "axios";
import { Fetcher } from "swr";

const fetcher :Fetcher<User,string>= async (url: string)  => {
  const res = await axios(url);
  return res.data;

};
export default fetcher;
