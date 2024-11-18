'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  onSave: (dataURL: string) => void;
}

const SignModal: React.FC<SignModalProps> = ({ isOpen, onOpenChange, onClose, onSave }) => {
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignatureImage(null);
    }
    handleClose();
  };

  const saveSignature = () => {
    if (signatureRef.current && signatureRef.current.isEmpty()) {
      alert('Please provide a signature first!');
    } else if (signatureRef.current) {
      const dataURL = signatureRef.current.toDataURL();
      onSave(dataURL);
      setSignatureImage(dataURL);
    }
    clearSignature();
    handleClose();
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Signature</ModalHeader>
              <ModalBody>
                <div className="">
                  <SignatureCanvas
                    ref={signatureRef}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 200,
                      className: 'sigCanvas',
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={clearSignature}>Cancel</Button>
                <Button color="primary" onClick={saveSignature}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignModal;
