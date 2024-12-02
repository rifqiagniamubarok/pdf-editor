import MobileVersion from '@/components/partial/MobileVersion';
import PdfEditor from '@/components/PdfEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor | Signlys',
  description: 'Simplify Your Signing Process with Signlys!',
};

const Page = () => {
  return (
    <>
      <MobileVersion />
      <main className="hidden md:inline-block">
        <PdfEditor />
      </main>
    </>
  );
};

export default Page;
