import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/components/Heading";
import SkateboardProduct from "./SkateboardProduct";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid: FC<ProductGridProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-gray"
    >
      <Heading as="h2"  className="text-5xl font-extrabold text-center mb-6 md:mb-10 pt-10">
     <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="text-center mb-6 md:mb-10">
     <PrismicRichText field={slice.primary.body} />
      </div>
     {slice.primary.product.map(({skateboard}) => 
    isFilled.contentRelationship(skateboard) && (
      <SkateboardProduct key={skateboard.id} id={skateboard.id} />
    )
)}
    </Bounded>
  );
};

export default ProductGrid;
