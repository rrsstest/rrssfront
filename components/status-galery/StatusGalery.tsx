'use client';
import { Image } from "@heroui/image";

export const StatusGalery = () => {

  return (
    <div className="flex flex-row space-x-2 items-center">
      <Image
        isZoomed
        alt="HeroUI Fruit Image with Zoom"
        src="https://heroui.com/images/fruit-1.jpeg"
        width={ 130 }
        height={ 160 }
        isBlurred
      />
      <Image
        isZoomed
        alt="HeroUI Fruit Image with Zoom"
        src="https://www.heroui.com/_next/image?url=%2Fimages%2Fcard-example-6.webp&w=128&q=75"
        width={ 130 }
        height={ 160 }
        isBlurred
      />
      <Image
        isZoomed
        alt="HeroUI Fruit Image with Zoom"
        src="https://www.heroui.com/_next/image?url=%2Fimages%2Fhero-card.webp&w=256&q=75"
        width={ 130 }
        height={ 160 }
        isBlurred
      />
      <Image
        isZoomed
        alt="HeroUI Fruit Image with Zoom"
        src="https://media.vandal.net/i/1280x720/4-2025/18/202541811395553_1.jpg.webp"
        width={ 130 }
        height={ 160 }
        isBlurred
      />
      <Image
        isZoomed
        alt="HeroUI Fruit Image with Zoom"
        src="https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiIyMDIxLTA4L2p3ZTJfdjFfa2V5YXJ0X25vX2xvZ29fMTkyMHgxMDgwLmpwZyIsImVkaXRzIjp7IndlYnAiOnsicXVhbGl0eSI6ODV9LCJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyODAsImZpdCI6ImNvbnRhaW4ifX19"
        width={ 130 }
        height={ 160 }
        isBlurred
      />
    </div>
  );
};