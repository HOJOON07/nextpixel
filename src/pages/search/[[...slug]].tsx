import BreadcrumbItem from "@/components/atoms/BreadcrumbItem";
import Text from "@/components/atoms/Text";
import Box from "@/components/layout/Box";
import Flex from "@/components/layout/Flex";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FilterGroup from "@/components/molecules/FilterGroup";
import ProductCardList from "@/components/organisms/ProductCardList";
import Layout from "@/components/templates/Layout";
import ProductCardListContainer from "@/containers/ProductCardListContainer";
import { Category, Condition } from "@/types/data";
import exp from "constants";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const AnChor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const categoryNameDict: Record<Category, string> = {
  book: "책",
  shoes: "신발",
  clothes: "의류",
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  //쿼리문에 검색 결과가 슬러그로 저장될 거고 배열이라면 트루조건문 아니라면 빈배열 탈거임
  const slug: Category[] = Array.isArray(router.query.slug)
    ? (router.query.slug as Category[])
    : [];

  const conditions = (() => {
    if (Array.isArray(router.query.condition)) {
      return router.query.condtion as Condition[];
    } else if (router.query.condition) {
      return [router.query.condition as Condition];
    } else {
      return [];
    }
  })();

  const handleChage = (selected: string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        slug,
        condition: selected,
      },
    });
  };

  return (
    <Layout>
      <Box
        paddingLeft={{ base: 2, md: 3 }}
        paddingRight={{ base: 2, md: 3 }}
        paddingTop={2}
        paddingBottom={2}
      >
        <Box marginBottom={1}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/">
                <a>톱</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/search">
                <a>검색</a>
              </Link>
            </BreadcrumbItem>
            {/* 빵 부스러기 리스트를 선택한 카테고리에서 생성 */}
            {slug.slice(0, slug.length - 1).map((category, index) => (
              <BreadcrumbItem key={index}>
                <Link href={`/search/${slug.slice(0, index + 1).join("/")}`}>
                  <a>{categoryNameDict[category] ?? "Unknown"}</a>
                </Link>
              </BreadcrumbItem>
            ))}
            {slug.length === 0 && <BreadcrumbItem>모두</BreadcrumbItem>}
            {slug.length > 0 && (
              <BreadcrumbItem>
                {categoryNameDict[slug[slug.length - 1]] ?? "Unknown"}
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
        <Flex>
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Box as="aside" minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
              <FilterGroup
                title="상품 상태"
                items={[
                  { label: "새 상품", name: "new" },
                  { label: "중고 상품", name: "used" },
                ]}
                value={conditions}
                onChange={handleChage}
              ></FilterGroup>
              <Box paddingTop={1}>
                <Text as="h2" fontWeight="bold" variant="mediumLarge">
                  카테고리
                </Text>
                <Box>
                  <Link href="/search/" passHref>
                    <AnChor as="a">모두</AnChor>
                  </Link>
                </Box>
                {/* 카테고리 링크 */}
                {Object.keys(categoryNameDict).map((category, index) => (
                  <Box key={index} marginTop={1}>
                    <Link href={`/search/${category}`} passHref>
                      <AnChor as="a">
                        {categoryNameDict[category as Category]}
                      </AnChor>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Text
                as="h2"
                display={{ base: "block", md: "none" }}
                fontWeight="bold"
                variant="mediumLarge"
              >
                상품목록
              </Text>
              <ProductCardListContainer
                category={slug.length > 0 ? slug[slug.length - 1] : undefined}
                conditions={conditions}
              ></ProductCardListContainer>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default SearchPage;
