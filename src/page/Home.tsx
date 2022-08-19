import React, { useEffect, useState, Fragment } from 'react';
import '../App.css';
import axios from 'axios';
import { Champion, ChampionTag } from '../interfaces';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type Props = {};

const HomePage = (props: Props) => {
  const [champions, setChampions] = React.useState<Champion[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedTag, setSelectedTag] = React.useState<ChampionTag>(
    ChampionTag.All,
  );
  const classTag = [
    { id: 1, name: 'Assassin', unavailable: false },
    { id: 2, name: 'Fighter', unavailable: false },
    { id: 3, name: 'Mage', unavailable: false },
    { id: 4, name: 'Marksman', unavailable: true },
    { id: 5, name: 'Support', unavailable: false },
    { id: 6, name: 'Tank', unavailable: false },
  ];
  const [selected, setSelected] = useState(classTag[0])

  useEffect(() => {
    axios
      .get(
        'http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion.json',
      )
      .then((res) => {
        setChampions(Object.values(res.data.data));
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='px-4'>

      <form className='p-5 flex gap-5'>
        <input
          className='px-2 py-1 basis-3/4 shadow-md rounded-lg'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type='search'
          placeholder='Search by name'
        /> 



<div className="w-72 basis-1/4">
  <Listbox value={selected} onChange={setSelected}>
    <div className="relative mt-1">
      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate">{selected.name}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <SelectorIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {classTag.map((classTag, classTagIdx) => (
            <Listbox.Option
              key={classTagIdx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                }`
              }
              value={classTag}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {classTag.name}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
</div>



        {/* <select
        value={selectedTag as string}
        onChange={(e) => setSelectedTag(e.target.value as ChampionTag)}>
          <option value={ChampionTag.All}>Select a champion tag</option>
          {Object.values(ChampionTag).map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select> */}


      </form>

      <div className='grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
        {champions
          .filter((champion) =>
            champion.name.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .filter(
            (champion) =>
              selectedTag === ChampionTag.All ||
              champion.tags.includes(selectedTag as ChampionTag),
          )

          .map((champion) => {
            return (
              <div
                key={champion.id}
                className='p-2 space-y-1 text-center rounded-lg shadow-md cursor-pointer shadow-gray-200 hover:shadow-lg hover:bg-slate-200'
              >
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  className='w-full rounded-md'
                />

                <h1 className='text-xl font-bold'>{champion.name}</h1>
                <p className='font-bold underline first-letter:capitalize'>{champion.title}</p>
                <p className='text-xs'>Type : {champion.partype}</p>

                <div className='space-x-2'>
                  {champion.tags.map((tag) => (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className='underline text-sm'>Stats ( / per level)</h1>
                <div className='text-xs'>
                  <p> Armor : {champion.stats.armor} / {champion.stats.armorperlevel} </p>
                  <p> Attack Damage : {champion.stats.attackdamage} / {champion.stats.attackdamageperlevel} </p>
                  <p> Attack Range : {champion.stats.attackrange} </p>
                  <p> Attack Speed : {champion.stats.attackspeed} / {champion.stats.attackspeedperlevel} </p>
                  <p> Crit : {champion.stats.crit} / {champion.stats.critperlevel} </p>
                  <p> HP : {champion.stats.hp} / {champion.stats.hpperlevel} </p>
                  <p> HP Regen : {champion.stats.hpregen} / {champion.stats.hpregenperlevel} </p>
                  <p> Movespeed : {champion.stats.movespeed} </p>
                  <p> MP : {champion.stats.mp} / {champion.stats.mpperlevel} </p>
                  <p> MP Regen : {champion.stats.mpregen} / {champion.stats.mpregenperlevel} </p>
                  <p> Spellblock : {champion.stats.spellblock} / {champion.stats.spellblockperlevel} </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;