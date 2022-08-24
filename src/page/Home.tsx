import React, { useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Champion, ChampionTag } from '../interfaces';
import Dropdown from '../components/Dropdown';
import { SearchIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { championProfilePicture } from '../constants';

type Props = {};

const HomePage = (props: Props) => {
  const [champions, setChampions] = React.useState<Champion[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedTag, setSelectedTag] = React.useState<ChampionTag>(
    ChampionTag.All,
  );

  
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

  const navigate = useNavigate()

  return (
    <div className='px-4'>

      <form className='grid grid-cols-2 gap-5 p-5 md:grid-cols-3 lg:grid-cols-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Search by name
          </label>
          <div className='relative mt-1 rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <SearchIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
            </div>
            <input
              type='search'
              name='name'
              id='name'
              className='block w-full py-2.5 pr-2 shadow-md pl-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Name'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        
        <Dropdown setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
        
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
                className='p-2 space-y-1 text-center rounded-lg shadow-md cursor-pointer shadow-gray-200 hover:shadow-lg hover:bg-slate-200 hover:cursor-pointer'
                onClick={() => navigate(`/champion/${champion.name}`)}
              >
                <img
                  src={ championProfilePicture + champion.image.full}
                  // src={`http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  className='w-full rounded-md'
                />

                <h1 className='text-xl font-bold'>{champion.name}</h1>
                <p className='font-bold underline first-letter:capitalize'>{champion.title}</p>
                <p className='text-xs'>Type : {champion.partype}</p>

                <div className='space-x-2'>
                  {champion.tags.map((tag) => (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800'>
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className='text-sm underline'>Stats ( / per level)</h1>
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