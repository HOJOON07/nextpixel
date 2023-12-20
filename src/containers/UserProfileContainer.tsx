import UserProfile from "@/components/organisms/UserProfile";
import useUser from "@/services/users/use-user";
import { ApiContext, User } from "@/types/data";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || "api/proxy",
};

interface UserProfileContainerProps {
  //사용자 아이디
  userId: number;
  //초기에 표시할 사용자
  user?: User;
}

const UserProfileContainer = ({ userId, user }: UserProfileContainerProps) => {
  // 최신 사용자 정보를 얻어 업데이트가 있을 때는 initial에 지정돼 있는 데이터를 덮어 쓴다.
  const { user: u } = useUser(context, { id: userId, initial: user });

  if (!u) return <div>Loading...</div>;
  return (
    <UserProfile
      username={`${u.username} (${u.displayName})`}
      profileImageUrl={u.profileImageUrl}
      numberOfProducts={100}
      description={u.description}
    ></UserProfile>
  );
};

export default UserProfileContainer;
