import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

interface SliderProps {
  slides: any;
}

interface ImgProps {
  $src: string;
}

interface DotsProps {
  $current: boolean;
}

const ImgSlider = ({ slides }: SliderProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [next, setNext] = useState(true);

  const onPrev = () => {
    const isFirst = currentIdx === 0;
    const newIdx = isFirst ? 0 : currentIdx - 1;
    setCurrentIdx(newIdx);
    setNext(false);
  };

  const onNext = () => {
    const isLast = currentIdx === slides.length - 1;
    const newIdx = isLast ? slides.length - 1 : currentIdx + 1;
    setCurrentIdx(newIdx);
    setNext(true);
  };

  const renderDots = () => {
    const dots = [];
    if (currentIdx > 1) {
      if (currentIdx + 2 < slides.length - 1) {
        const startIdx = currentIdx - 2;
        const endIdx = currentIdx + 2;

        for (let i = startIdx; i <= endIdx; i++) {
          dots.push(<Dots key={i} $current={i === currentIdx} />);
        }
      } else {
        const startIdx = slides.length - 5;
        const endIdx = slides.length - 1;

        for (let i = startIdx; i <= endIdx; i++) {
          dots.push(<Dots key={i} $current={i === currentIdx} />);
        }
      }
    } else {
      for (let i = 0; i < 5; i++) {
        dots.push(<Dots key={i} $current={i === currentIdx} />);
      }
    }

    return dots;
  };

  return (
    <div className="relative w-full img-button-hover cursor-pointer">
      <AnimatePresence initial={false} custom={next}>
        <ImgWrapper>
          <Img
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 1 },
            }}
            custom={next}
            key={currentIdx}
            variants={imgVariants}
            initial="init"
            animate="ani"
            exit="exit"
            $src={slides[currentIdx].src}
            className="box-border p-3 rounded-xl"
          />
        </ImgWrapper>
      </AnimatePresence>

      <div className="absolute top-2 right-2 w-8 h-8 text-3xl flex justify-center items-center">
        <AiOutlineHeart />
      </div>

      {currentIdx !== 0 && (
        <Prev
          onClick={onPrev}
          className="absolute w-8 h-8 bg-white rounded-full flex justify-center items-center top-1/2 target"
        >
          <MdArrowBackIos />
        </Prev>
      )}
      {currentIdx !== slides.length - 1 && (
        <Next
          onClick={onNext}
          className="absolute w-8 h-8 bg-white rounded-full flex justify-center items-center top-1/2 target"
        >
          <MdArrowForwardIos />
        </Next>
      )}

      <div className="w-1/5 flex justify-evenly absolute inset-x-0 m-auto gap-1 bottom-2">
        {renderDots()}
      </div>
    </div>
  );
};

export default ImgSlider;

const imgVariants = {
  init: (next: boolean) => {
    return {
      x: next ? 100 : -100,
      opacity: 0.5,
    };
  },
  ani: {
    x: 0,
    opacity: 1,
    zIndex: 0,
  },
  exit: (next: boolean) => {
    return {
      x: next ? -100 : 100,
      opacity: 0.5,
    };
  },
};

const ImgWrapper = styled.div`
  overflow: hidden;
`;

const Img = styled(motion.div)<ImgProps>`
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  aspect-ratio: 1/1;
`;

const Prev = styled.button`
  transform: translateY(-50%);
  left: 12px;
`;

const Next = styled.button`
  transform: translateY(-50%);
  right: 12px;
`;

const Dots = styled.div<DotsProps>`
  background-color: ${({ $current }) => ($current ? 'white' : 'rgba(0,0,0,0.5)')};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;
