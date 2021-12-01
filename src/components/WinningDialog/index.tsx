/**
 *  @author: Razvan Rauta
 *  Date: Dec 01 2021
 *  Time: 15:43
 */

import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';
import { Fragment } from 'react';

import Spinner from '../Spinner';

const BingoSticker = dynamic(() => import('../BingoSticker'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner />,
});

interface WinningDialogProps {
  handleClose: () => void;
  isOpen: boolean;
}

export default function WinningDialog({
  handleClose,
  isOpen,
}: WinningDialogProps): ReactElement {
  const closeModal = () => {
    handleClose();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='min-h-[300px] overflow-y-auto fixed inset-0 z-10'
        onClose={closeModal}
      >
        <div className='px-4 min-h-screen text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='min-h-[300px] inline-block overflow-hidden p-6 my-8 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform'>
              <BingoSticker />
              <div className='relative mt-4 h-6'>
                <button
                  type='button'
                  className='focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none hover:bg-blue-200 inline-flex absolute top-0 right-0 z-10 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md border border-transparent'
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
