const Carousel = () => {
  return (
    <div className='carousel carousel-center max-w pb-0  px-6 space-x-4   rounded-box'>
      <div className='carousel-item h-80'>
        <img
          alt='icon'
          src='https://img.kwcdn.com/product/open/2023-09-10/1694353359216-416c0e01dc9049b0bf262732ac540658-goods.jpeg?imageView2/2/w/750/q/80/format/webp'
          className='rounded-box'
        />
      </div>
      <div className='carousel-item h-80'>
        <img
          alt='iconImage'
          src='https://img.kwcdn.com/product/open/2023-09-10/1694353359631-58ee625b7c9d4508beabe4a9118c84f3-goods.jpeg?imageView2/2/w/800/q/70/format/webp'
          className='rounded-box'
        />
      </div>
      <div className='carousel-item h-80'>
        <img
          alt='iconImage'
          src='https://img.kwcdn.com/product/open/2023-09-10/1694353360171-aa1e528596f44e738ddc7dc7a0b6815c-goods.jpeg?imageView2/2/w/800/q/70/format/webp'
          className='rounded-box'
        />
      </div>
      <div className='carousel-item h-80'>
        <img
          alt='iconImage'
          src='https://img.kwcdn.com/product/open/2023-09-10/1694353362749-3efae0a58162495184e09dc944deccb7-goods.jpeg?imageView2/2/w/800/q/70/format/webp'
          className='rounded-box'
        />
      </div>
    </div>
  );
};

export default Carousel;
