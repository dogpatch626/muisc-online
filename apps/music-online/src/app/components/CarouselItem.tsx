import React, { Dispatch, SetStateAction } from 'react';
type carouselProps = {
  activeItem: number;
  setActiveItem: Dispatch<SetStateAction<number>>;
  index: number;
};
export default function CarouselItem({
  activeItem,
  setActiveItem,
  index,
}: carouselProps) {
  return (
    <>
      {index === activeItem && (
        <td className="carousel-table-item-active ">CarouselItem</td>
      )}
      {index !== activeItem && (
        <td className="carousel-table-item-inactive ">CarouselItem</td>
      )}
    </>
  );
}
