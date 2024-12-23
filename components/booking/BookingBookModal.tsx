"use client";

import { FC, ReactNode } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";

type BookingBookModalProps = {
    btnName?: string
    closeBtnName?: string
    modalChildren?: ReactNode
    modalTitle: string
}

const BookingBookModal: FC<BookingBookModalProps> = ({
    btnName,
    closeBtnName,
    modalChildren,
    modalTitle
}: BookingBookModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  return (
    <>
      <Button size="lg" className="bg-sky-600" onPress={() => handleOpen()}>{btnName}</Button>
      <Modal isOpen={isOpen} size={"4xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                {modalChildren}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {closeBtnName}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookingBookModal;
