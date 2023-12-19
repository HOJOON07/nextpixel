import signin from "@/services/auth/signin";
import signout from "@/services/auth/signout";
import { ApiContext, User } from "@/types/data";
import React, { useContext } from "react";
import useSWR from "swr";
// signin함수를 호출해서 인증 api 호출, 로그인이 성공하면 mutate 함수를 호출해 다시
// 사용자 취득을 호출해서 인증 사용잦를 콘텍스트에 저장한다.
// 로그아웃은 signout 함수 실행

type AuthContextType = {
  authUser?: User;
  isLoading: boolean;
  signin: (username: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  mutate: (
    data?: User | Promise<User>,
    shouldRevalidata?: boolean
  ) => Promise<User | undefined>;
};

type AuthContextProviderProps = {
  context: ApiContext;
  authUser?: User;
};

const AuthContext = React.createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
});

export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext);

export const AuthContextProvider = ({
  context,
  authUser,
  children,
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  const { data, error, mutate } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, "")}/users/me`
  );
  const isLoading = !data && !error;

  const signinInternal = async (username: string, password: string) => {
    await signin(context, { username, password });
    await mutate();
  };

  const signoutInternal = async () => {
    await signout(context);
    await mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        authUser: data ?? authUser,
        isLoading,
        signin: signinInternal,
        signout: signoutInternal,
        mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
