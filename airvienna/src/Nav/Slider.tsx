import { styled } from 'styled-components';
import { IoMdSwitch } from 'react-icons/io';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import SliderItem from './SliderItem';
import { SliderData } from '../Components/SampleData/SliderSampleData';
import { useEffect, useRef, useState } from 'react';

const Slider = () => {
  const scrollRef = useRef() as any;

  const onPrev = () => {
    const current = scrollRef.current.scrollLeft;
    const newScroll = current - 900;
    scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  const onNext = () => {
    const current = scrollRef.current.scrollLeft;
    const newScroll = current + 900;
    scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  const [leftHide, setLeftHide] = useState(false);
  const [rightHide, setRightHide] = useState(false);

  const hideHandler = () => {
    const currentScroll = scrollRef.current.scrollLeft;

    setLeftHide(currentScroll === 0);
    setRightHide(currentScroll > scrollRef.current.scrollWidth - window.innerWidth + 200);
  };

  useEffect(() => {
    hideHandler();

    const scrollWrapper = scrollRef.current;
    const handleScroll = () => {
      hideHandler();
    };

    scrollWrapper.addEventListener('scroll', handleScroll);

    return () => {
      scrollWrapper.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper className="w-full flex items-center gap-1 relative bg-white">
      {!leftHide && (
        <PrevWrapper className="flex items-center h-full absolute bg-white w-12">
          <Prev
            onClick={onPrev}
            className="flex justify-center items-center absolute cursor-pointer w-8 h-8 rounded-2xl"
          >
            <AiOutlineLeft />
          </Prev>
        </PrevWrapper>
      )}

      <ItemWrapper
        ref={scrollRef}
        className="box-border flex items-center gap-12 scroll-hidden h-full relative overflow-scroll"
      >
        {SliderData.map((data, idx) => (
          <SliderItem key={idx} imgsrc={data.imgsrc} name={data.name} />
        ))}
      </ItemWrapper>

      <NextWrapper
        onClick={onNext}
        className="relative flex justify-between items-center box-border h-full bg-white right-0"
      >
        <Next
          $hide={rightHide}
          className="flex justify-center items-center cursor-pointer w-8 h-8 rounded-2xl"
        >
          <AiOutlineRight />
        </Next>

        <Filter className="flex justify-around items-center box-border cursor-pointer w-20 h-12 rounded-xl p-2.5 text-sm">
          <span className="text-lg">
            <IoMdSwitch />
          </span>
          <span>필터</span>
        </Filter>
      </NextWrapper>
    </Wrapper>
  );
};

export default Slider;

interface NextProps {
  $hide: boolean;
}

const Wrapper = styled.div`
  height: calc(var(--nav-h) + 1rem);

  padding-inline-start: var(--p-big);
  padding-inline-end: var(--p-big);

  @media screen and (max-width: 1440px) {
    padding-inline-start: var(--p-medium);
    padding-inline-end: var(--p-medium);
  }
  @media screen and (max-width: 743px) {
    padding: var(--p-small);
  }
`;

const PrevWrapper = styled.div`
  left: var(--p-big);
  @media screen and (max-width: 1440px) {
    left: var(--p-medium);
  }
  @media screen and (max-width: 743px) {
    display: none;
  }

  z-index: 1;
`;

const Prev = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const NextWrapper = styled.div`
  width: 300px;

  @media screen and (max-width: 743px) {
    display: none;
  }
`;

const Next = styled.div<NextProps>`
  border: 1px solid rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  visibility: ${({ $hide }) => $hide && 'hidden'};
`;

const Filter = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const ItemWrapper = styled.div`
  @media screen and (max-width: 743px) {
    padding: var(--p-small);
  }

  width: 200vw;
`;
