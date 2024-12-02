'use client';

import ButtonNigtmode from '@/components/partial/ButtonNigtmode';
import { Button, Card } from '@nextui-org/react';
import { FileText, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-screen h-screen dark:bg-dark-black bg-white ">
      <div className="bg-primary">
        <div className="p-4 container mx-auto">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex items-center gap-4">
              <Button as={Link} target="__black" href="https://github.com/rifqiagniamubarok/pdf-editor" variant="light" isIconOnly size="sm"></Button>
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
                  <p className="text-xl font-semibold">Start sign your document</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
