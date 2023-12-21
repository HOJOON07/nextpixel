import AppLogo from "@/components/atoms/AppLogo";
import Flex from "@/components/layout/Flex";
import Layout from "@/components/templates/Layout";
import SigninFormContainer from "@/containers/SigninFormContainer";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SigninPage: NextPage = () => {
  const router = useRouter();

  const handleSignin = async (err?: Error) => {
    if (!err) {
      const redirectTo = (router.query[`redirect_to`] as string) ?? "/";
      console.log("Redirecting", redirectTo);

      await router.push(redirectTo);
    }
  };

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Flex
          width="400px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box marginBottom={2}>
            <AppLogo></AppLogo>
            <Box width="100%">
              <SigninFormContainer
                onSignin={handleSignin}
              ></SigninFormContainer>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default SigninPage;
