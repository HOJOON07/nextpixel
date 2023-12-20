import useSWR from "swr";
import type { ApiContext, User } from "@/types/data";

export type UseUserProps = {
  id: number;
  initial?: User;
};

export type UseUser = {
  //사용자 정보
  user?: User;
  //API 호출 중 여부
  isLoading: boolean;
  // API 호출 중 에러 발생 여부
  isError: boolean;
};

const useUser = (
  context: ApiContext,
  { id, initial }: UseUserProps
): UseUser => {
  const { data, error } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, "")}/users/${id}`
  );
  return {
    user: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useUser;
