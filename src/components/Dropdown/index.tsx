import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import { ChampionTag } from '../../interfaces';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  setSelectedTag: (value: React.SetStateAction<ChampionTag>) => void;
  selectedTag: ChampionTag;
}

export default function Dropdown({ setSelectedTag, selectedTag }: Props) {
  return (
    <Combobox as='div' value={selectedTag} onChange={setSelectedTag}>
      <Combobox.Label className='block text-sm font-medium text-gray-700'>
        Search by tag
      </Combobox.Label>
      <div className='relative mt-1'>
        <Combobox.Input
          className='w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
          onChange={(event) =>
            setSelectedTag(event.target.value as ChampionTag)
          }
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
          <SelectorIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
        </Combobox.Button>

        <Combobox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {Object.values(ChampionTag).map((tag) => (
            <Combobox.Option
              key={tag}
              value={tag}
              className={({ active }) =>
                classNames(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <div className='flex items-center'>
                    {/* <img
                      src={person.imageUrl}
                      alt=''
                      className='flex-shrink-0 w-6 h-6 rounded-full'
                    /> */}
                    <span
                      className={classNames(
                        'ml-3 truncate',
                        selected ? 'font-semibold' : '',
                      )}
                    >
                      {tag}
                    </span>
                  </div>

                  {selected && (
                    <span
                      className={classNames(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-indigo-600',
                      )}
                    >
                      <CheckIcon className='w-5 h-5' aria-hidden='true' />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}