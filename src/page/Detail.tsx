import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Champion } from '../interfaces';

type Props = {}

const DetailPage = (props: Props) => {
  const { name } = useParams();
  const [champion, setChampion] = React.useState<Champion | null>(null);

  React.useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion/${name}.json`,
      )
      .then((res) => {
        setChampion(res.data.data[name as string]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return <div>
    <div className='grid grid-cols-4'>
      {
        champion && champion.skins.map((skin, index) => {
          return (
            <div key={index} className='flex items-center justify-center'>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skin.num}.jpg`}
                alt={skin.name}
              />
            </div>
          )
        })
      }
    </div>
  </div>
}

export default DetailPage