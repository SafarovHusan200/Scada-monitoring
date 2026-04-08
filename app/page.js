import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-semibold text-gray-800 mb-3">
        Scada Monitoring tizimiga xush kelibsiz✨🚀
      </h1>
      <Link
        href={'/dashboard'}
        className=" bg-blue-600  hover:bg-blue-700    text-white    px-4 py-2    rounded-lg    text-sm    font-medium    transition    hadow-sm"
      >
        Doshboard
      </Link>
    </div>
  );
}
