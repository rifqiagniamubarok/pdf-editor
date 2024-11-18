'use client';

import PdfEditor from '@/components/PdfEditor';
import { Button, useDisclosure } from '@nextui-org/react';

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className="">
      <div>
        <PdfEditor />
      </div>
    </div>
  );
}
