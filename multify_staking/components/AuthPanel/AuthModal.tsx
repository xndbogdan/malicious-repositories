import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/24/solid";
import Login from './Login'
import { useAuth } from '../../context/authcontext';
import SingUp from './SignUp';

export default function AuthModal({ setOpen, open } : { setOpen: any, open: boolean }) {
  // const [open, setOpen] = useState(true)

  const { authModal: { whichAuth } } = useAuth();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom gradientBody rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button type="button" className="focus:outline-none focus:ring-0" onClick={() => setOpen(false)}>
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="cursor-pointer text-teal-600 w-8 h-8" /> 
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"> */}
                  {/* <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                {/* </div> */}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  {/* <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Deactivate account
                  </Dialog.Title> */}
                  <div className="mt-2">
                    { whichAuth === 'sign-in' ? <Login /> : <SingUp /> }
                  </div>
                </div>
              </div>
              
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}