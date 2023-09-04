import { styled } from 'styled-components';

interface OverlayProps {
  onClose: () => void;
  zIndex?: number;
}

interface WrapperProps {
  $zIndex?: number;
}

export const BlackBgOverlay = ({ onClose }: OverlayProps) => {
  return (
    <BlackWrapper
      onClick={onClose}
      className="w-full h-full absolute inset-x-0 inset-y-0"
    />
  );
};

export const WhiteBgOverlay = ({ onClose, zIndex }: OverlayProps) => {
  return (
    <WhiteWrapper
      $zIndex={zIndex}
      onClick={onClose}
      className="w-full h-full absolute inset-x-0 inset-y-0"
    />
  );
};

const BlackWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const WhiteWrapper = styled.div<WrapperProps>`
  z-index: ${({ $zIndex }) => ($zIndex ? $zIndex : 2)};
`;
