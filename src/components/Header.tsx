import Link from "next/link"
import { ButtonLink } from "./ButtonLink"
import { Logo } from "./Logo"



export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 h-32 md:48 px-4 md:px-6 py-4 md:py-6 hd:h-32">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr] ">
            <Link className="justify-self-start" href={'/'}>
            <Logo className="text-brand-purple h-12 md:h-20"/>
            </Link>
            <nav aria-label="Main" className="col-span-full row-start-2  md:col-span-1 md:col-start-2 md:row-start-1">
                <ul className="flex flex-wrap items-center justify-center gap-8">
                    <li>Boards</li>
                </ul>
            </nav>
            <div className="justify-self-end">
                <ButtonLink href={''} icon="cart" color="purple" oria-label='Cart(1)'>
                    <span className="md:hidden">1</span>
                    <span className="hidden md:inline">Cart (1)</span>
                </ButtonLink>
            </div>
        </div>
    </header>
  )
}
