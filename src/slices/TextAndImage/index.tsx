import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { Parallaximage } from "./Parallaximage";

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */

const TextAndImage: FC<TextAndImageProps> = ({ slice }) => {

  const theme =slice.primary.thema
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        theme === 'Blue' && "bg-texture bg-brand-blue text-white",
        theme === 'Orange' && "bg-texture bg-brand-orange text-white",
        theme === 'Navy' && "bg-texture bg-brand-navy text-white",
        theme === 'Lime' && "bg-texture bg-brand-lime text-white",
      )}
    >

     <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">

    <div className={clsx('flex flex-col items-center gap-8 text-center md:items-start md:text-left', slice.variation === 'imageOnLeft'&& 'md:order-2')}>
      <Heading as="h2"  className="text-5xl font-extrabold  m mb-6 md:mb-10 pt-10">
    <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="max-w-md text-lg leading-relaxed">
    <PrismicRichText field={slice.primary.body} />
      </div>
    <ButtonLink field={slice.primary.button}
    color={theme === 'Lime' ?'orange':'lime'}
    >
      {slice.primary.button.text}
    </ButtonLink>
      </div>
   
    <Parallaximage foregroundImage={slice.primary.fourgroundimage} backgroundImage={slice.primary.backgroundimage}/>

    </div>
    </section>
  );
};

export default TextAndImage;
