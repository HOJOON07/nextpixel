import { fetcher } from "@/utils";
import { ApiContext } from "./../../types/data.d";
/**인증 API
 * @param context API Context
 * @returns logout message
 */

const signout = async (context: ApiContext): Promise<{ message: string }> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/auth/signout`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export default signout;
