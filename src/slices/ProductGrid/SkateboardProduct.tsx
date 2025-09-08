import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
type Props = {
    id:string,
}

const SkateboardProduct = async({id}: Props) => {
    const client = createClient()
    const product = await client.getByID<Content.
    SkateboardDocument >(id)
    

  return (
    <div>
        <PrismicNextImage alt="" field={product.data.image} width={150}/>
    </div>
  )
}

export default SkateboardProduct