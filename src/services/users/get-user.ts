import { ApiContext, User } from "@/types/data";
import { fetcher } from "@/utils";

export interface GetUserParams {
  id: number;
}

/**
 * 사용자 API (개별취득)
 * @param params 파라미터
 * @return 사용자
 */

const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/users/${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export default getUser;
