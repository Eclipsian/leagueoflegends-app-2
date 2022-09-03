import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Champion } from '../interfaces';
import { championPfp, championDetails, championSkins, spellsImage } from '../constants';
import { capitalizeFirstLetter } from '../helpers';
import { SparklesIcon, StarIcon } from '@heroicons/react/solid';

type Props = {}

const DetailPage = (props: Props) => {
  const { name } = useParams();
  const [champion, setChampion] = React.useState<Champion | null>(null);

  React.useEffect(() => {
    axios
      .get(
        championDetails + name + '.json'
        // `http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion/${name}.json`,
      )
      .then((res) => {
        setChampion(res.data.data[name as string]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  
  return ( champion && (
    <div className='w-full max-w-5xl px-4 mx-auto'>
      
      <div className='flex items-center justify-center m-5 space-x-4'>
        <img
          src={ championPfp + champion?.image.full }
          alt={ champion?.name }
          className='w-16 h-16 rounded-full'
        />
        <h1 className='my-4 text-3xl font-semibold'>
          {champion?.name} {champion?.title}
        </h1>
      </div>

      <div className='grid grid-cols-1 mx-3 my-4 md:grid-cols-4'>
        {champion?.info && Object.entries(champion.info).map(([key, value]) => (
          //className='capitalize'
          <span className='flex items-center text-lg'>
            {capitalizeFirstLetter(key)}: {' '}
            {Array(value)
              .fill(0)
              .map((_, index) => (
                <StarIcon className='w-5 h-6 text-amber-400' key={index} />
              ))}
          </span>
        ))}
      </div>
      
      <p className='text-center text-gray-500 text-md'> {champion?.lore} </p>

      <div className='grid grid-cols-1 gap-4 my-4 md:grid-cols-5'>
        <div className='p-4 rounded-lg shadow-md bg-slate-100'>
          <img
            src={ spellsImage + 'passive/' + champion.passive.image.full }
            //src={`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/passive/${champion.passive.image.full}`}
            className='w-10 h-10 rounded-full'
            alt=''
          />
          <p className='mt-2 text-sm font-medium'>Passive: {champion?.passive.name}</p>
          {/* <p className='text-sm'>{champion?.passive.description}</p> */}
        </div>
        
        {champion.spells.map((spell) => (
          <div
            className='p-4 rounded-lg shadow-lg bg-slate-100'
            key={spell.name}
          >
            <img
              src={ spellsImage + 'spell/' + spell.image.full }
              //src={`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/${spell.image.full}`}
              className='w-10 h-10 rounded-full'
              alt=''
            />
            <p className='mt-2 text-sm font-medium'>{spell.name}</p>
            {/* <p className='text-sm'>{spell.description}</p> */}
          </div>
        ))}
        
      </div>
      
      <div className='grid grid-cols-1 gap-4 my-5 md:grid-cols-2'>
        
        <div className='px-3.5 py-2.5 rounded-lg bg-red-100'>
          <p className='mb-1 text-lg font-semibold'>Enemy Tips</p>
          <ul className='pl-4 space-y-1.5 text-sm list-disc'>
            {champion?.enemytips.map((tip) => (
              <li>{tip}</li>
            ))} 
          </ul>
        </div>
        
        <div className='px-3.5 py-2.5 rounded-lg bg-green-100'>
          <p className='mb-1 text-lg font-semibold'>Ally Tips</p>
          <ul className='pl-4 space-y-1.5 text-sm list-disc'>
            {champion?.allytips.map((tip) => (
              <li>{tip}</li>
            ))} 
          </ul>
        </div>
        
      </div>

      <div className='grid grid-cols-2 gap-4 m-4 md:grid-cols-3 lg:grid-cols-4'>
        {champion && champion.skins.map((skin, index) => {
          return (
            <div key={index} className='flex items-center justify-center'>
              <img
                src={ championSkins + champion.name + '_' + skin.num + '.jpg'}
                //src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skin.num}.jpg`}
                alt={skin.name}
                className='border border-white shadow-lg shadow-black'
              />
            </div>
          );
        })}
      </div>
    </div>
  ));
};

export default DetailPage