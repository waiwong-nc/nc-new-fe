import './randomImage.scss';

const RandomImage = ({_class}) => {

    const picNo = Math.floor(Math.random() * 10) ;  
    return (
      <img className={`random_img ${_class}`} src={require(`../../assets/images/${picNo}.webp`)}></img>
    );
};

export default RandomImage;
