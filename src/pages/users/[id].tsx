import BreadcrumbItem from "@/components/atoms/BreadcrumbItem";
import Separator from "@/components/atoms/Separator";
import Box from "@/components/layout/Box";
import Flex from "@/components/layout/Flex";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import UserProfile from "@/components/organisms/UserProfile";
import Layout from "@/components/templates/Layout";
import getUser from "@/services/users/get-user";
import { ApiContext } from "@/types/data";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { getStaticProps } from "next/dist/build/templates/pages";
import Link from "next/link";
import { useRouter } from "next/router";

type UserPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const UserPage: NextPage<UserPageProps> = ({
  id,
  user,
  products,
}: UserPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Box width="1180px">
          <Box marginBottom={2}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/">
                  <a>톱</a>
                </Link>
              </BreadcrumbItem>
              {user && <BreadcrumbItem>{user.username}</BreadcrumbItem>}
            </Breadcrumb>
          </Box>
          <Box>
            <Box marginBottom={1}>
              {/* 사용자 프로필 컨테이너
              사용자 정보를 표시하는 곳이고, useUser로 항상 최신 데이터 -> ISR */}
              <UserProfileContainer></UserProfileContainer>
            </Box>
            <Box marginBottom={1}>
              <Separator></Separator>
            </Box>
            {/* 사용자가 소유한 상품의 리스트를 표시하고 useSearch로 항상 최신 데이터를 얻을 수 있도록 함. */}
            <UserProductCardListContainer
              userId={id}
              products={products}
            ></UserProductCardListContainer>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || "http://localhost:5000",
  };
  const users = await getAllUsers(context);
  const paths = users.map((user) => `/users/${user.id}`);

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || "http://localhost:5000",
  };

  if (!params) {
    throw new Error("params is undefined");
  }

  const userId = Number(params.id);
  const [user, products] = await Promise.all([
    getUser(context, { id: userId }),
    getAllProducts(context, { userId }),
  ]);

  return {
    props: {
      id: userId,
      user,
      products: products ?? [],
    },
  };
};

export default UserPage;
