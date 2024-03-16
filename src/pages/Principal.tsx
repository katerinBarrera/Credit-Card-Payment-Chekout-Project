import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Carousel from '../components/Carousel';
import { decrement, increment } from '../features/counters/counterSlices';
import {
  IconAlertCircle,
  IconArrowBack,
  IconBrandMastercard,
  IconBrandVisa,
  IconCreditCardPay,
} from '@tabler/icons-react';
import { useState } from 'react';

const Principal = () => {
  const quantity = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stage, setStage] = useState('basic_information');
  const [showFinalStatus, setShowFinalStatus] = useState(false);
  const element = document.getElementById('my_modal_5') as HTMLDialogElement;

  const renderBasicInformation = () => {
    return (
      <>
        <h3 className='font-bold text-lg'>Enter your information</h3>
        <input className='inp-primary' placeholder='Email' />
        <input className='inp-primary' placeholder='Full Name' />
        We accept the following cards
        <div className='flex space-x-4'>
          <IconBrandVisa height={30} width={30} className='text-blue-700' />
          <IconBrandMastercard height={30} width={30} className='text-orange-500' />
        </div>
      </>
    );
  };

  const renderCardInformation = () => {
    return (
      <>
        <div className='flex space-x-2 items-center'>
          {stage === 'cardsInformation' && (
            <button className='btn btn-ghost' onClick={() => setStage('basic_information')}>
              <IconArrowBack />
            </button>
          )}
          <h3 className='font-bold text-lg'>Enter your card information</h3>
        </div>
        <input type='number ' className='inp-primary' placeholder={`Card's number`} />
        Expiration date
        <input className='inp-primary' type='month' />
        CVC
        <input className='inp-primary' type='number' placeholder='12-' />
        <input className='inp-primary' type='text' placeholder='' />
        Number of installments
        <input className='inp-primary' type='text' placeholder='' />
        <input className='inp-primary' placeholder='Full Name' />
        <select className='inp-primary' />
        <input className='inp-primary' placeholder='Id number' />
        <div className='space-x-4'>
          <input
            type='checkbox'
            checked
            className=' accent-indigo-700 rounded-sm bg-white border-1 border-indigo-500'
          />
          <span>Acepto términos y condiciones</span>
        </div>
      </>
    );
  };

  const renderSummary = () => {
    return (
      <div className='static'>
        {stage === 'summary' && (
          <button className='btn btn-ghost absolute' onClick={() => setStage('cardsInformation')}>
            <IconArrowBack />
          </button>
        )}
        <div className='bg-white text-indigo-600 shadow-lg shadow-indigo-400 mb-2 flex self-center justify-center items-center mx-auto rounded-full w-20 h-20 '>
          <IconAlertCircle height={80} width={50} />
        </div>
        <h3 className='font-bold text-lg pb-4 text-center'>Confirm Payment</h3>
        <span className='py-4'>Review details of this transaction and hit confirm to proceed</span>
        <div className='cardSecondary my-4 '>
          <div className='grid grid-rows-3 grid-flow-col gap-4 '>
            <div>Subtotal</div>
            <div>Delivery charges</div>
            <div className='text-indigo-500 font-semibold'> Total Amount</div>
            <div>$40.000</div>
            <div>$40.000</div>
            <div className='text-indigo-500 font-semibold'>$400.000</div>
          </div>
        </div>
      </div>
    );
  };

  const validateCardInfo = () => {
    setStage('basic_information');
    setIsModalOpen(false);

    setShowFinalStatus(true);
    element?.close();
    console.log('a');
  };

  const renderFinalStatus = () => {
    return (
      <div className='h-screen static'>
        <div className='h-1/2 bg-violet-600 shadow-2xl'></div>
        <div className='absolute top-36  px-10 flex justify-center'>
          <div className='cardSecondary static  left-5'>
            <div className='bg-white absolute text-indigo-600 shadow-lg shadow-indigo-400 mb-2 flex self-center justify-center items-center mx-auto rounded-full w-20 h-20 -top-10 left-36 '>
              <IconAlertCircle height={80} width={50} />
            </div>
            <div className='py-8'>
              <h3 className='font-bold text-lg pb-4 text-center'>Payment Failed!</h3>
              <span>
                Hey, seems like there was some trouble. <br />
                Confirm your card information and try again!
              </span>
              <span className='py-4'>
                Review details of this transaction and hit confirm to proceed
              </span>
              <div className=' my-4 '>
                <div className='grid grid-rows-3 grid-flow-col gap-4 '>
                  <div>Subtotal</div>
                  <div>Delivery charges</div>
                  <div className='text-indigo-500 font-semibold'> Total Amount</div>
                  <div>$40.000</div>
                  <div>$40.000</div>
                  <div className='text-indigo-500 font-semibold'>$400.000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='h-1/2 bg-white'></div>

        <button onClick={() => setShowFinalStatus(false)}>Home</button>
      </div>
    );
  };

  const body = () => {
    return (
      <div className='bg-blue-50 h-[100vh] flex'>
        <div
          className={`flex flex-col container mx-auto h-[100vh] px-10 ${isModalOpen && 'blur-sm '}`}>
          <span className='text-indigo-600 font-semibold  text-xl text-center pt-2'>
            {' '}
            Producto estrella
          </span>
          <div className='py-4'>
            <Carousel />
            <div className='flex drop-shadow-lg justify-between font-semibold bg-indigo-200 rounded-lg mx-4 text-white p-4'>
              <div>Producto x</div>
              <div>$ 250.000</div>
            </div>
          </div>
          <div className='flex'>
            <button className='card' onClick={() => dispatch(increment())}>
              +{' '}
            </button>
            <span className='w-10 text-center self-center'>{quantity}</span>
            <button className='card ' onClick={() => dispatch(decrement())}>
              -
            </button>
          </div>
          <div className='text-justify pt-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptates accusantium
            quis similique ratione tempore laboriosam sit, voluptas, beatae iure laborum veniam,
            reprehenderit mollitia alias in commodi quidem! Debitis, inventore.
          </div>

          <div className='p-4 mx-auto'>
            <button
              onClick={() => {
                const temp = document.getElementById('my_modal_5') as HTMLDialogElement;
                if (element) {
                  element.showModal();
                } else {
                  temp.showModal();
                }
                setIsModalOpen(true);
              }}
              className='btn-primary shadow-lg shadow-indigo-400/50 items-center flex space-x-4'>
              <span className=''>Pay with credit card</span>
              <IconCreditCardPay className='' />
            </button>
            <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle '>
              <div className='modal-box bg-indigo-100 space-y-2 text-gray-600'>
                {stage === 'basic_information'
                  ? renderBasicInformation()
                  : stage === 'cardsInformation'
                    ? renderCardInformation()
                    : renderSummary()}
                <div className='modal-action space-x-4'>
                  <form method='dialog' className='flex items-center'>
                    <button
                      className='flex items-center '
                      onClick={() => {
                        setStage('basic_information');
                        setIsModalOpen(false);
                      }}>
                      <span className='self-center items-center '>Close</span>
                    </button>
                  </form>
                  <button
                    className='btn btn-primary text-center items-center'
                    onClick={() => {
                      if (stage === 'basic_information') {
                        setStage('cardsInformation');
                      } else if (stage === 'cardsInformation') {
                        setStage('summary');
                      } else {
                        validateCardInfo();
                      }
                    }}>
                    {stage === 'basic_information'
                      ? 'Continue'
                      : stage === 'summary'
                        ? 'Confirm'
                        : 'Payment'}
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    );
  };

  return showFinalStatus ? renderFinalStatus() : body();
};

export default Principal;
