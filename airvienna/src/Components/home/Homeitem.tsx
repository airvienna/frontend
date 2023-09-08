import { styled } from 'styled-components';
import { BsFillStarFill } from 'react-icons/bs';
import ImgSlider from './ImgSlider';

export interface ImgArrayProps {
  src: string;
}
const ImgArray: ImgArrayProps[] = [
  {
    src: '/src/Components/Imgs/one.png',
  },
  {
    src: '/src/Components/Imgs/two.png',
  },
  {
    src: '/src/Components/Imgs/three.png',
  },
  {
    src: '/src/Components/Imgs/four.png',
  },
  {
    src: '/src/Components/Imgs/five.png',
  },
  {
    src: '/src/Components/Imgs/six.png',
  },
  {
    src: '/src/Components/Imgs/seven.png',
  },
  {
    src: '/src/Components/Imgs/eight.png',
  },
];

const Homeitem = () => {
  return (
    <ItemWrapper className="w-full box-border">
      <div className="w-full">
        <ImgSlider slides={ImgArray} />
      </div>

      <Info className="w-full">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm whitespace-nowrap overflow-hidden">
            Sanbuk-myeon, Yeoyu-gun, 한국
          </span>
          <span className="flex items-center gap-1 text-sm">
            <BsFillStarFill />
            4.94
          </span>
        </div>

        <div className="flex flex-col text-sm">
          <span className="text-gray-500">치악산국립공원에서 60km</span>
          <span className="text-gray-500">10월 15일~20일</span>

          <span style={{ marginTop: '5px' }}>₩397,130 /박</span>
        </div>
      </Info>
    </ItemWrapper>
  );
};

export default Homeitem;

const ItemWrapper = styled.div`
  padding-top: 10px;
`;

const Info = styled.div``;
