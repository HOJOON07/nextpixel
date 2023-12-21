import AppLogo from "@/components/atoms/AppLogo";
import Button from "@/components/atoms/Button";
import {
  PersonIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@/components/atoms/IconButton";
import ShapeImage from "@/components/atoms/ShapeImage";
import Spinner from "@/components/atoms/Spinner";
import Text from "@/components/atoms/Text";
import Flex from "@/components/layout/Flex";
import BadgeIconButton from "@/components/molecules/BadgeIconButton";
import { useAuthContext } from "@/contexts/AuthContext";
import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";

import { Box } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[2]};
  }
`;

const NavLink = styled.span`
  display: inline;
`;

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderRoot = styled.header`
  height: 88px;
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Header = () => {
  const { cart } = useShoppingCartContext();
  const { authUser, isLoading } = useAuthContext();

  return (
    <HeaderRoot>
      <Flex>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Link href="/" passHref>
              <Anchor as="a">
                <AppLogo></AppLogo>
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search" passHref>
                <Anchor as="a">모두</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/clothes" passHref>
                <Anchor as="a">의류</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/book" passHref>
                <Anchor as="a">책</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/shoes" passHref>
                <Anchor as="a">신발</Anchor>
              </Link>
            </Box>
          </NavLink>
        </Nav>
        <Nav>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/clothes" passHref>
                <Anchor as="a">
                  <SearchIcon></SearchIcon>
                </Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Link href="/cart" passHref>
              <Anchor as="a">
                <BadgeIconButton
                  icon={<ShoppingCartIcon size={24}></ShoppingCartIcon>}
                  size="24px"
                  badgeContent={cart.length === 0 ? undefined : cart.length}
                  badgeBackgroundColor="#ed9f28"
                ></BadgeIconButton>
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            {(() => {
              if (authUser) {
                return (
                  <Link href={`/users/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <ShapeImage
                        shape="circle"
                        src={authUser.profileImageUrl}
                        alt="사용자 프로필 이미지"
                        width={24}
                        height={24}
                        data-testid="profile-shape-image"
                      ></ShapeImage>
                    </Anchor>
                  </Link>
                );
              } else if (isLoading) {
                return <Spinner size={20} strokeWidth={2}></Spinner>;
              } else {
                return (
                  <Link href="/signin" passHref>
                    <Anchor as="a">
                      <PersonIcon size={24}></PersonIcon>
                    </Anchor>
                  </Link>
                );
              }
            })()}
          </NavLink>
          <NavLink>
            <Link href="/sell" passHref>
              <Button as="a">등록</Button>
            </Link>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
  );
};

export default Header;
