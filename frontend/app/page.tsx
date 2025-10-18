'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center font-inherit">
      <h1 className="text-[6rem] font-bold tracking-[-0.04em] m-0 leading-none">
        CIX
      </h1>
      <p className="mt-2 text-[1.35rem] text-[#222] tracking-[0.05em] font-normal">
        A word chain puzzle game.
      </p>
      <button
        onClick={() => router.push('/cix')}
        className="mt-10 px-10 py-3.5 text-[1.15rem] border-none bg-black text-white cursor-pointer tracking-[0.06em] font-medium outline-none transition-colors duration-150 hover:bg-neutral-800 rounded-[8px] transition-transform duration-150 hover:scale-105"
      >
        Enter
      </button>
    </div>
  );
}
