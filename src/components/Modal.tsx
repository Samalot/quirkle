import { Fragment } from "react";
import { Amatic_SC } from 'next/font/google';

interface ModalProps {
  title: string;
  isOpen: boolean;
  close: Function;
  height: number;
  children: React.ReactNode;
}

const amaticSC = Amatic_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap'
});

const Modal = ({
  title,
  isOpen,
  close,
  children,
  height
}: ModalProps) => {
  return isOpen ? (
    <div className="fixed bg-gray-400 w-screen h-screen z-50 top-0 left-0 m-auto bg-opacity-55 backdrop-blur-sm">
      <div
        id="default-modal"
        aria-hidden={isOpen}
        style={{ height }}
        className="fixed top-0 bottom-0 right-0 left-0 justify-center items-center max-w-md m-auto overflow-hidden rounded-lg border-2 border-gray-200 z-50"
      >
        <div className="relative bg-gray-100 h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className={`text-xl text-gray-900 ${amaticSC.className}`}>
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
              onClick={() => close()}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="m-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : <Fragment />;
};

export default Modal;