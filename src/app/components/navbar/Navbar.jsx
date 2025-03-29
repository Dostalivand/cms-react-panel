"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Navbar() {

    const pathname = usePathname();
    const router = useRouter()

    const navs = [
        { title: "home", link: "/" },
        { title: "about", link: "/about" },
    ];

    const handlerClick = () => {
        router.push("/sss")
    }

    return (
        <div>
            <nav>
                <ul className='flex gap-3'>
                    {navs.map((item) => (
                        <li key={item.link}>
                            <Link className={item.link === pathname ? "text-blue-400" : "text-black"}
                                href={`${item.link}`}>{item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <button onClick={handlerClick} className='bg-blue-500 p-4 cursor-pointer rounded-2xl'>click</button>
            </nav>
        </div>

    )
}


