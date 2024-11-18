import React from 'react';
import { Card, Button, Input, Tooltip, Accordion, AccordionItem } from '@nextui-org/react';
import { Layers3, Trash2, ExternalLink, ClipboardPaste } from 'lucide-react';
import classNames from 'classnames';

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

interface SidebarEditorProps {
  signatureImageSelect: Signature | null;
  sizeSignature: { name: string; width: number; height: number }[];
  numPages: number | null;
  pageNumber: number;
  signatureImages: Signature[];
  handleDuplicatToAllPage: (signature: Signature) => void;
  handleDeleteSignature: (signature: Signature) => void;
  setSignatureImageSelect: (signature: Signature | null) => void;
  handleSyncSelectSignature: (signature: Signature) => void;
  handleMovePage: (page: number) => void;
  handleSelectSignature: (signature: Signature) => void;
  handleDuplicteToCurrentPage: (signature: Signature) => void;
}

const SidebarEditor: React.FC<SidebarEditorProps> = ({
  signatureImageSelect,
  sizeSignature,
  numPages,
  pageNumber,
  signatureImages,
  handleDuplicatToAllPage,
  handleDeleteSignature,
  setSignatureImageSelect,
  handleSyncSelectSignature,
  handleMovePage,
  handleSelectSignature,
  handleDuplicteToCurrentPage,
}) => {
  return (
    <>
      {signatureImageSelect && (
        <Card className="space-y-1 px-4 py-4">
          <div className="w-full aspect-2/1  bg-slate-200 rounded-md">
            <img src={signatureImageSelect.src} alt="Signature" className="w-full aspect-2/1" />
          </div>
          <div className="text-sm space-y-2">
            <div className="">
              <div className="flex items-center justify-end gap-0.5">
                <Button
                  isIconOnly
                  size="sm"
                  color="success"
                  onClick={() => {
                    handleDuplicatToAllPage(signatureImageSelect);
                  }}
                >
                  <Layers3 size={16} className="text-white" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  onClick={() => {
                    handleDeleteSignature(signatureImageSelect);
                    setSignatureImageSelect(null);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <div>
              <Input
                startContent={<p className="text-xs text-slate-500">Name</p>}
                value={signatureImageSelect.name}
                onChange={({ target }) => {
                  const moment = { ...signatureImageSelect, name: target.value };
                  setSignatureImageSelect(moment);
                  handleSyncSelectSignature(moment);
                }}
              />
            </div>
            <div className="">
              <div className="flex items-center justify-center gap-2">
                <Input
                  startContent={<p className="text-xs text-slate-500">W</p>}
                  size="sm"
                  value={signatureImageSelect.width.toString()}
                  type="number"
                  min={50}
                  onChange={({ target }) => {
                    const moment = { ...signatureImageSelect, width: Number(target.value), height: Number(target.value) / 2 };
                    setSignatureImageSelect(moment);
                    handleSyncSelectSignature(moment);
                  }}
                />
                <div>X</div>
                <Input
                  startContent={<p className="text-xs text-slate-500">H</p>}
                  size="sm"
                  value={signatureImageSelect.height.toString()}
                  type="number"
                  min={25}
                  onChange={({ target }) => {
                    const moment = { ...signatureImageSelect, height: Number(target.value), width: Number(target.value) * 2 };
                    setSignatureImageSelect(moment);
                    handleSyncSelectSignature(moment);
                  }}
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                {sizeSignature.map((size, index) => (
                  <Button
                    key={index}
                    variant={signatureImageSelect.width == size.width ? 'bordered' : 'solid'}
                    className="w-fit aspect-square"
                    isIconOnly
                    onClick={() => {
                      const moment = { ...signatureImageSelect, width: size.width, height: size.height };
                      setSignatureImageSelect(moment);
                      handleSyncSelectSignature(moment);
                    }}
                  >
                    {size.name}
                  </Button>
                ))}
                {sizeSignature.filter((size) => size.width == signatureImageSelect.width).length === 0 && <Button variant="bordered">custom</Button>}
              </div>
            </div>
          </div>
        </Card>
      )}
      <Card className="space-y-1 p-2">
        <Accordion selectionMode="multiple" isCompact showDivider={false}>
          {[...Array(numPages || 0)].map((_, index) => (
            <AccordionItem
              key={index}
              aria-label={`Accordion ${index}`}
              title={
                <div className="flex items-center gap-2">
                  <p className={classNames('text-base', index == pageNumber - 1 ? 'text-blue-500' : 'text-black')}>{'Page ' + (index + 1)}</p>
                  {pageNumber != index + 1 && (
                    <ExternalLink
                      size={16}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMovePage(index + 1);
                      }}
                    />
                  )}
                </div>
              }
            >
              {signatureImages.length > 0 &&
                signatureImages
                  .filter((signature) => signature.page === index + 1)
                  .map((signature, index) => (
                    <div
                      key={index}
                      className="bg-white flex justify-between items-center hover:bg-gray-200 cursor-pointer p-1 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectSignature(signature);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <img src={signature.src} alt="Signature" style={{ width: '40px', height: '20px' }} className="object-contain " />
                        <p className={classNames('text-xs', signature?.id == signatureImageSelect?.id ? 'text-blue-500' : 'text-black')}>{signature.name}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {pageNumber !== signature.page && (
                          <Tooltip content="Copy this signature to current page">
                            <button
                              className={'bg-green-500 text-white'}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicteToCurrentPage(signature);
                              }}
                            >
                              <ClipboardPaste size={14} />
                            </button>
                          </Tooltip>
                        )}
                        <Tooltip content="Delete this signature">
                          <button
                            className={'bg-red-500 text-white'}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSignature(signature);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
              {signatureImages.filter((signature) => signature.page === index + 1).length === 0 && <p className="text-xs text-slate-400 text-center">no signature here</p>}
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </>
  );
};

export default SidebarEditor;
