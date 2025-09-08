import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";



import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <div className="grid absolute inset-0 mx-auto mt-24 max-w-6xl grid-rows-[1fr.auto] place-items-start px-6 ~py-10/16">
      <Heading className="text-5xl font-extrabold relative  max-w-sm self-start">
     <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="flex justify-between gap-30">
     <PrismicRichText field={slice.primary.body} />
     <div className=" text-nowrap">
      <ButtonLink field={slice.primary.button} icon="skateboard" size="lg" className="z-20 mt-2 block py-1">
        {slice.primary.button.text}
      </ButtonLink>
     </div>
      </div>
      </div>
    </Bounded>
  );
};

export default Hero;
