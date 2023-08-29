import { styled } from 'styled-components';
import ModalHeader from './ModalHeader';
import MLogo from '../../Nav/svg/MLogo';
import Button from '../general/Button';
import DarkButton from '../general/DarkButton';

interface AddProfileModalProps {
  onClose: (value: boolean) => void;
}

const AddProfileModal = ({ onClose }: AddProfileModalProps) => {
  return (
    <Wrapper className="flex flex-col p-5 rounded-xl justify-between items-center">
      <ModalHeader onClick={() => onClose(true)}>프로필 생성하기</ModalHeader>

      <LogoWrapper>
        <MLogo />
      </LogoWrapper>

      <BigText className="text-2xl font-semibold">
        에어비엔나에 오신 것을 환영합니다.
      </BigText>
      <span>전 세계 숙소 및 독특한 소시지를 찾아보세요.</span>
      <DarkButton onClick={() => onClose(true)}>계속</DarkButton>
    </Wrapper>
  );
};

export default AddProfileModal;

const LogoWrapper = styled.div`
  color: var(--main-color);
`;

const Wrapper = styled.div`
  width: var(--modal-wrapper-width);
  height: 300px;

  position: fixed;
  z-index: 2;

  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
`;

const BigText = styled.span`
  margin-bottom: -30px;
`;
