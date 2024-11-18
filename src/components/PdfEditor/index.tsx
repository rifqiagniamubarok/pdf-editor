'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Button, Card, Divider, useDisclosure } from '@nextui-org/react';
import DraggableSignature from './DraggableSignature';
import SidebarEditor from './SidebarEditor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import SignModal from './SignModal';

// Set the worker URL to the correct path
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const ItemTypes = {
  SIGNATURE: 'signature',
};

interface Signature {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
  page: number;
  name: string;
}

interface DropAreaProps {
  children: React.ReactNode;
  onDrop: (index: number, offset: { x: number; y: number }) => void;
}

const DropArea: React.FC<DropAreaProps> = ({ children, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.SIGNATURE,
    drop: (item: { index: number }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onDrop(item.index, offset);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(ref);

  const isActive = canDrop && isOver;

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        position: 'relative',
      }}
      className="bg-white drop-area border h-fit"
    >
      {children}
    </div>
  );
};

const PdfEditor: React.FC = () => {
  const { isOpen: isOpenSE, onOpen: onOpenSE, onOpenChange: onOpenChangeSE, onClose: onCloseSE } = useDisclosure();
  const [signatureImages, setSignatureImages] = useState<Signature[]>([]);
  const [signatureImageSelect, setSignatureImageSelect] = useState<Signature | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBytes = e.target?.result as ArrayBuffer;
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        setPdfData(pdfDataUri);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(error.message);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
    setPageNumber(1);
    setNumPages(null);
    setError(null);
  };

  const handleSaveSignature = (sign: string) => {
    const payload: Signature = {
      src: sign,
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      id: Number(signatureImages.length),
      page: pageNumber,
      name: 'sign ' + (signatureImages.length + 1),
    };
    setSignatureImages([...signatureImages, payload]);
    setSignatureImageSelect(payload);
    onCloseSE();
  };

  const handleDrop = (index: number, offset: { x: number; y: number }) => {
    const dropArea = document.querySelector('.drop-area');
    const dropAreaRect = dropArea?.getBoundingClientRect();
    if (!dropAreaRect) return;

    const x = offset.x - dropAreaRect.left;
    const y = offset.y - dropAreaRect.top;

    setSignatureImages((prevSignatures) => prevSignatures.map((signature, i) => (i === index ? { ...signature, x, y, page: pageNumber } : signature)));
  };

  const addSignaturesToPdf = async () => {
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }

    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      for (const signature of signatureImages) {
        const imageBytes = await fetch(signature.src).then((res) => res.arrayBuffer());
        const image = await pdfDoc.embedPng(imageBytes);

        const pages = pdfDoc.getPages();
        const page = pages[signature.page - 1];
        const { width, height } = page.getSize();

        page.drawImage(image, {
          x: signature.x,
          y: height - 50 - signature.y,
          width: signature.width,
          height: signature.height,
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'signed-document.pdf');
    } catch (err) {
      console.error('Error editing and downloading PDF:', err);
      setError('Failed to edit and download PDF.');
    }
  };

  const handleMovePage = (page: number) => {
    setPageNumber(page);
  };

  const handleSelectSignature = (sign: Signature) => {
    setSignatureImageSelect(sign);
    setPageNumber(sign.page);
  };

  const handleDuplicteToCurrentPage = (signature: Signature) => {
    setSignatureImages([...signatureImages, { ...signature, id: Number(signatureImages.length), page: pageNumber }]);
  };

  const handleDeleteSignature = (signature: Signature) => {
    setSignatureImages(signatureImages.filter((sign) => sign.id !== signature.id));
  };

  const sortSignatures = () => {
    setSignatureImages([...signatureImages].sort((a, b) => a.id - b.id));
  };

  const handleSyncSelectSignature = (signature: Signature) => {
    const filteredSignature = signatureImages.filter((sign) => sign.id !== signature.id);
    setSignatureImages([...filteredSignature, signature]);
  };

  const handleDuplicatToAllPage = (signature: Signature) => {
    const newSignatures = [...signatureImages];
    for (let i = 1; i <= (numPages || 0); i++) {
      if (i !== signature.page) {
        const payload = { ...signature };
        payload.id = Number(newSignatures.length);
        payload.page = Number(i);
        newSignatures.push(payload);
      }
    }
    setSignatureImages(newSignatures);
  };

  const sizeSignature = [
    {
      name: 'sm',
      width: 50,
      height: 25,
    },
    {
      name: 'md',
      width: 100,
      height: 50,
    },
    {
      name: 'lg',
      width: 200,
      height: 100,
    },
    {
      name: 'xl',
      width: 400,
      height: 200,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <Card className=" col-span-3 p-4 bg-white">
        <div className="w-full h-full">
          <div className="flex my-2 gap-2">
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="" />
            <Button onClick={onOpenSE} className="" isDisabled={!file}>
              Add Signature
            </Button>
            <Button onClick={addSignaturesToPdf} className="" isDisabled={!file}>
              Download PDF
            </Button>
          </div>
          <Divider className="mb-4" />
          <div className="bg-[#333639] text-white px-2 pt-2 pb-4 space-y-2 rounded-md">
            <div className="w-full flex items-center justify-between">
              <div>
                <Button onClick={goToPrevPage} isDisabled={pageNumber <= 1 || !file}>
                  Prev
                </Button>
              </div>
              <div>
                {pageNumber} / {numPages}
              </div>
              <div>
                <Button onClick={goToNextPage} isDisabled={pageNumber >= (numPages || 0) || !file}>
                  Next
                </Button>
              </div>
            </div>
            <div className="w-full flex justify-center ">
              <div className="min-h-screen w-fit drop-area">
                <DndProvider backend={HTML5Backend}>
                  <DropArea onDrop={handleDrop}>
                    {file && (
                      <div className="relative w-full h-full">
                        {error ? (
                          <div className="text-red-500">{`Error loading PDF: ${error}`}</div>
                        ) : (
                          <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
                            <Page pageNumber={pageNumber} />
                          </Document>
                        )}
                        {signatureImages.map((signature, index) => {
                          if (signature.page !== pageNumber) return null;
                          return (
                            <DraggableSignature
                              key={index}
                              isSelected={signatureImageSelect?.id == signature?.id}
                              src={signature.src}
                              position={{ x: signature.x, y: signature.y }}
                              index={index}
                              onDrop={handleDrop}
                              onClick={() => setSignatureImageSelect(signature)}
                              width={signature.width}
                              height={signature.height}
                            />
                          );
                        })}
                      </div>
                    )}
                  </DropArea>
                </DndProvider>
              </div>
            </div>
          </div>
          <SignModal isOpen={isOpenSE} onOpenChange={onOpenChangeSE} onClose={onCloseSE} onSave={handleSaveSignature} />
        </div>
      </Card>

      <div className="col-span-1 space-y-4">
        <SidebarEditor
          signatureImageSelect={signatureImageSelect}
          sizeSignature={sizeSignature}
          numPages={numPages}
          pageNumber={pageNumber}
          signatureImages={signatureImages}
          handleDuplicatToAllPage={handleDuplicatToAllPage}
          handleDeleteSignature={handleDeleteSignature}
          setSignatureImageSelect={setSignatureImageSelect}
          handleSyncSelectSignature={handleSyncSelectSignature}
          handleMovePage={handleMovePage}
          handleSelectSignature={handleSelectSignature}
          handleDuplicteToCurrentPage={handleDuplicteToCurrentPage}
        />
      </div>
    </div>
  );
};

export default PdfEditor;
