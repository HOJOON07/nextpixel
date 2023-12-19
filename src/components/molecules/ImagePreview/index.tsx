import { CloseIcon } from "@/components/atoms/IconButton";
import Box from "@/components/layout/Box";
import Flex from "@/components/layout/Flex";
import React from "react";
import styled from "styled-components";

const ImagePreviewContainer = styled(Box)`
  position: relative;
`;

const CloseBox = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 0 6px 0 6px;
  background-color: rgba(44, 44, 44, 0.66);
  cursor: pointer;
`;

interface ImagePreviewProps {
  src?: string;
  alt?: string;
  height?: string;
  width?: string;
  onRemove?: (src: string) => void;
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { src, alt, height, width, onRemove } = props;

  const handleCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove && src && onRemove(src);
    return false;
  };
  return (
    <ImagePreviewContainer height={height} width={width}>
      <img src={src} alt={alt} height={height} width={width}></img>
      <CloseBox
        alignItems="center"
        justifyContent="center"
        onClick={handleCloseClick}
      >
        <CloseIcon size={24} color="white"></CloseIcon>
      </CloseBox>
    </ImagePreviewContainer>
  );
};

export default ImagePreview;
