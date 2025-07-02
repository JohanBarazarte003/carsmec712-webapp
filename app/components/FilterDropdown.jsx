// Archivo: app/components/FilterDropdown.jsx
'use client';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

const FilterDropdown = ({ categories }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-800 px-4 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-700">
          Categorías
          <ChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href="/shop" className={`${active ? 'bg-brand-red text-white' : 'text-gray-300'} block px-4 py-2 text-sm`}>
                  Ver Todo
                </Link>
              )}
            </Menu.Item>
            {categories.map((category) => (
              <Menu.Item key={category}>
                {({ active }) => (
                  <Link href={`/shop?category=${encodeURIComponent(category)}`} className={`${active ? 'bg-brand-red text-white' : 'text-gray-300'} block px-4 py-2 text-sm`}>
                    {category}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilterDropdown;