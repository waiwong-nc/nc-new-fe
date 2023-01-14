import './randomImage.scss';
import { useMemo } from 'react';

const RandomImage = ({ _class }) => {

  const picNo = useMemo(() => Math.floor(Math.random() * 24), []);

  return (
    <img
      className={`random_img ${_class}`}
      src={require(`../../assets/images/${picNo}.webp`)}
      alt=""
    ></img>
  );
};

export default RandomImage;
