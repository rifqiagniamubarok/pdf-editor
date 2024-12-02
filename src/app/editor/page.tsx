import PdfEditor from '@/components/PdfEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor | Signlys',
  description: 'Simplify Your Signing Process with Signlys!',
};

const Page = () => {
  return (
    <>
      <main>
        <PdfEditor />
      </main>
    </>
  );
};

export default Page;
