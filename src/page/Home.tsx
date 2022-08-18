import React, { useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Champion, ChampionTag } from '../interfaces';

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

  return (
    <div className='px-4'>
      <form>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type='search'
        />
        <select
          value={selectedTag as string}
          onChange={(e) => setSelectedTag(e.target.value as ChampionTag)}
        >
          <option value={ChampionTag.All}>Select a champion tag</option>
          {Object.values(ChampionTag).map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
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
                className='p-2 space-y-2 text-center bg-gray-100 rounded-lg shadow-sm hover:shadow-lg hover:bg-slate-100 cursor pointer'
              >
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  className='w-full'
                />

                <h1 className='text-lg font-semibold'>{champion.name}</h1>
                <p className='text-xs font-medium'>{champion.title}</p>
                <div className='space-x-2'>
                  {champion.tags.map((tag) => (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className='grid grid-cols-2 gap-1 p-1 text-xs font-medium text-left'>
                  <p className=''>Attack:{champion.info.attack}</p>
                  <p className=''>Defense:{champion.info.defense}</p>
                  <p className=''>Health:{champion.stats.hp}</p>
                  <p className=''>Hpperlevel:{champion.stats.hpperlevel}</p>
                  <p className=''>Mp:{champion.stats.mp}</p>
                  <p className=''>Movement:{champion.stats.movespeed}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;