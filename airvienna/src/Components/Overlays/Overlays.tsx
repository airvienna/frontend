import { styled } from 'styled-components';

const BlackWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
`;

export const BlackBgOverlay = ({ onClose }: OverlayProps) => {
  return (
    <BlackWrapper
      onClick={onClose}
      className="w-full h-full absolute inset-x-0 inset-y-0"
    />
  );
};

export const WhiteBgOverlay = ({ onClose }: OverlayProps) => {
  return <div onClick={onClose} className="w-full h-full absolute inset-x-0 inset-y-0" />;
};

interface OverlayProps {
  onClose: () => void;
}
