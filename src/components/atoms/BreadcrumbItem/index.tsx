import styled from "styled-components";

/**
 * 빵 부스러기 리스트 요소
 */
const BreadcrumbItem = styled.li`
  list-style: none;
  display: inline;

  &:not(:first-child) {
    // 첫번재 요소 제외하고 슬래쉬(/)를 앞에 붙이게 한다.
    &::before {
      content: "/";
      color: ${({ theme }) => theme.colors.gray};
      padding: 0px 8px;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.gray};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default BreadcrumbItem;
