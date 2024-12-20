import ButtonNigtmode from '@/components/partial/ButtonNigtmode';
import MobileVersion from '@/components/partial/MobileVersion';
import { Button, Card } from '@nextui-org/react';
import { FileText, Layers3, PackageOpen, Proportions, ShieldEllipsis } from 'lucide-react';
import { Metadata } from 'next';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Signlys',
  description: 'Simplify Your Signing Process with Signlys!',
};

export default function Home() {
  return (
    <>
      <MobileVersion />
      <main className="w-screen min-h-screen pb-20 dark:bg-dark-black bg-white hidden md:inline-block">
        <div className="bg-primary">
          <div className="p-4 container mx-auto">
            <div className="flex justify-end items-center">
              <div className="flex items-center gap-4 ">
                <ButtonNigtmode />
              </div>
            </div>
          </div>
          <div className="h-80 flex text-secondary dark:text-secondary justify-center items-center">
            <div>
              <p className="text-center text-5xl font-semibold">Signlys</p>
              <p className="text-xl italic mt-4">Simplify Your Signing Process with Signlys!</p>
              <div className="flex justify-center mt-10">
                <Link target="__black" href="https://github.com/rifqiagniamubarok/pdf-editor">
                  <button className="bg-[#181717] hover:bg-opacity-80 transition-colors duration-200 p-3.5 text-white flex items-center gap-4 text-lg font-medium rounded-full">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[30px] aspect-square text-white fill-white rounded-full ">
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    Get on Github
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="mt-20">
            <Link href={'/editor'}>
              <Card className="w-fit p-4 cursor-pointer text-dark-black bg-white dark:bg-dark-gray dark:text-secondary hover:bg-secondary hover:bg-opacity-45 dark:hover:bg-opacity-80">
                <div className="flex items-center">
                  <div className="p-4">
                    <FileText size={40} />
                  </div>
                  <div>
                    <p className="text-xl font-semibold">Start signing your document</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
        <div className="mt-14">
          <p className="text-center text-3xl font-semibold text-black dark:text-secondary">Features</p>
          <div className="flex justify-center mt-4">
            <div className="w-2/3  grid grid-cols-3 gap-4">
              <Card className="p-4 w-full space-y-3 bg-white dark:bg-dark-gray">
                <div className="flex justify-center">
                  <Proportions size={100} className="text-emerald-800 dark:text-emerald-500" />
                </div>
                <div>
                  <p className="text-center text-2xl font-semibold mb-2 text-black dark:text-secondary">Layout</p>
                  <p className="text-center text-lg text-black dark:text-white">A highly intuitive layout similar to other editing applications.</p>
                </div>
              </Card>
              <Card className="p-4 w-full space-y-3 bg-white dark:bg-dark-gray">
                <div className="flex justify-center">
                  <Layers3 size={100} className="text-sky-800 dark:text-sky-500" />
                </div>
                <div>
                  <p className="text-center text-2xl font-semibold mb-2 text-black dark:text-secondary">Signature Copier</p>
                  <p className="text-center text-lg text-black dark:text-white">Easily copy and paste your signature across all pages.</p>
                </div>
              </Card>
              <Card className="p-4 w-full space-y-3 bg-white dark:bg-dark-gray">
                <div className="flex justify-center">
                  <PackageOpen size={100} className="text-red-800 dark:text-red-500" />
                </div>
                <div>
                  <p className="text-center text-2xl font-semibold mb-2 text-black dark:text-secondary">Open Source</p>
                  <p className="text-center text-lg text-black dark:text-white">
                    This project is open source and free for everyone to use and contribute to its development on GitHub.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
