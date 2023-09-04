import { styled } from 'styled-components';
import ModalHeader from './ModalHeader';
import MLogo from '../../Nav/svg/MLogo';
import DarkButton from '../general/DarkButton';
import { AddProfileModalProps } from '../../Types/modalType';

const AddProfileModal = ({ onClose }: AddProfileModalProps) => {
  return (
    <Wrapper className="flex flex-col p-5 rounded-xl justify-between items-center inset-0 bg-white fixed m-auto">
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

  z-index: 4;
`;

const BigText = styled.span`
  margin-bottom: -10px;
`;
