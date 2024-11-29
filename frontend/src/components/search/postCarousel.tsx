import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import React from "react";

const PostCarousel = () => {
  return (
    <Carousel>
      <CarouselContent className="basis-1/3">
        <CarouselItem className="">
          <Image src="/image.png" alt="Image 1" width={300} height={300} />
        </CarouselItem>
        <CarouselItem>
          <Image src="/image.png" alt="Image 1" width={100} height={100} />
        </CarouselItem>
        <CarouselItem>
          <Image src="/image.png" alt="Image 1" width={100} height={100} />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PostCarousel;
