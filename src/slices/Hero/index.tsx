import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";



import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";
import { InteractiveSkateboard } from "./InteractiveSkateboard";


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
      <div className="absolute inset-0 flex items-center pt-20">
         <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block"/>
         <TallLogo  className="w-full text-brand-purple block opacity-20 mix-blend-multiply lg:hidden"/>
      </div>

      <div className="grid absolute inset-0 mx-auto mt-24 max-w-6xl grid-rows-[1fr_auto] place-items-start px-6 py-10 md:py-16">
      <Heading className=" relative  max-w-sm md:max-w-lg self-start">
     <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="text-lg md:text-xl font-bold font-mono flex flex-col md:flex-row md:justify-between items-center  md:gap-30 ">
     <PrismicRichText field={slice.primary.body} />
     <div className=" text-nowrap">
      <ButtonLink field={slice.primary.button} icon="skateboard" size="lg" className=" z-20 mt-2 block py-1">
        {slice.primary.button.text}
      </ButtonLink>
     </div>
      </div>
      </div>
      <InteractiveSkateboard/>
    </Bounded>
  );
};

export default Hero;
