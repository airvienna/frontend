import { styled } from 'styled-components';
import { SliderDataProps } from '../Components/SampleData/SliderSampleData';

const SliderItem = ({ imgsrc, name }: SliderDataProps) => {
  return (
    <Wrapper className="flex flex-col items-center justify-center gap-1.5 h-full cursor-pointer">
      <img src={imgsrc} alt="" width="24" height="24" />

      <span className="text-xs whitespace-nowrap">{name}</span>
    </Wrapper>
  );
};

export default SliderItem;

const Wrapper = styled.div`
  &:hover {
    border-bottom: 1px solid var(--color-gray-400);
  }

  color: #717171;
`;
