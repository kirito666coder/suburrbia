import React, { FC } from "react";
import { Content} from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Skater } from "./Skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> =  async({ slice }) => {

  const client = createClient()

  const skaters = await client.getAllByType('skater')



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-blue"
    >
      <Heading as="h2" size='lg' className='mb-8 text-center text-white'>
     <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="grid grid-cols-1 gap-8  md:grid-cols-4">
        {
          skaters.map((skater,index)=>(
           <React.Fragment key={index}>
            {
              skater.data.frist_name && <Skater index={index} skater={skater}/>
            }
           </React.Fragment>
          ))
        }
      </div>
    </section>
  );
};

export default TeamGrid;
