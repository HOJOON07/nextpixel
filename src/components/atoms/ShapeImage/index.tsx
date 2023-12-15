import Image, { ImageProps } from "next/image";
import styled from "styled-components";

// 이 컴포넌트는 사각형이나 동그란 이미지를 구현할 때 사용할 수 있다.
// border-radius를 사용해서 경우에 맞게 재사용 가능하도록 아톰 컴포넌트를 설계함

type ImageShape = "circle" | "square";
type ShapeImageProps = ImageProps & { shape?: ImageShape };

// circle이면 원형으로

const ImageWithShape = styled(Image)<{ shape?: ImageShape }>`
  border-radius: ${({ shape }) => (shape === "circle" ? "50% " : "0")};
`;

/**
 * 이미지 프롭스 정의
 */

const ShapeImage = (props: ShapeImageProps) => {
  const { shape, ...imageProps } = props;
  return <ImageWithShape shape={shape} {...imageProps}></ImageWithShape>;
};

export default ShapeImage;
