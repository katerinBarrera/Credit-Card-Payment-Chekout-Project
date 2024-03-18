import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Carousel from '../components/Carousel';
import {
  decrement,
  increment,
  setBasicInformationState,
  setCardInformationState,
  setFinalStatus,
  setStageProcess,
  totalAmountValue,
} from '../features/counters/counterSlices';
import { IconAlertCircle, IconArrowBack, IconCreditCardPay } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import confirm from '../images/confirm.svg';
import denied from '../images/denied.svg';
import {
  formatMoney,
  generateId,
  validateCreditCardNumber,
  validateEmail,
} from '../helpers/helpers';
import { AlertParams, BasicInformation, CardInformation } from '../models/payment';
import RenderBasicInformation from './BasicForm/BasicForm';
import RenderCardInformation from './BasicForm/CardForm';

const Principal = () => {
  const { quantity, fullValue, deliveryCharges, totalAmount, userData, stageProcess, finalStatus } =
    useSelector((state: RootState) => state.counter);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stage, setStage] = useState(stageProcess);
  const [showFinalStatus, setShowFinalStatus] = useState(false);
  const [finalStatusState, setFinalStatusState] = useState(finalStatus);
  const [showAlert, setShowAlert] = useState<AlertParams>({
    email: {
      message: '',
      showAlert: false,
    },
    fullName: {
      message: '',
      showAlert: false,
    },
    card: {
      message: '',
      showAlert: false,
      type: '',
    },
  });
  const element = document.getElementById('modalComponent') as HTMLDialogElement;
  const date = new Date();

  const [basicInformation, setBasicInformation] = useState<BasicInformation>(
    userData.basicInformation,
  );
  const [cardInformation, setCardInformation] = useState<CardInformation>(userData.cardInformation);

  useEffect(() => {
    if (stage !== 'basicInformation' && stage !== 'finalStatus') {
      handleOpenModal();
    } else if (stage === 'finalStatus') {
      setShowFinalStatus(true);
    }
  }, [stage]);

  const handleOpenModal = () => {
    const element = document.getElementById('modalComponent') as HTMLDialogElement;
    if (element && !element.open) {
      element.showModal();
      setIsModalOpen(true);
    }
  };

  const initialState = () => {
    setBasicInformation({
      email: '',
      fullName: '',
    });
    dispatch(
      setBasicInformationState({
        email: '',
        fullName: '',
      }),
    );
    setCardInformation({
      cardNumber: null,
      cardExpiration: '',
      cardCvv: null,
      cardName: '',
      typeId: '',
      idNumber: null,
      installments: null,
    });
    dispatch(
      setCardInformationState({
        cardNumber: null,
        cardExpiration: '',
        cardCvv: null,
        cardName: '',
        typeId: '',
        idNumber: null,
        installments: null,
      }),
    );
  };

  const handleCloseModal = () => {
    const element = document.getElementById('modalComponent') as HTMLDialogElement;
    if (element && element.open) {
      element.close();
      setIsModalOpen(false);
    }
    setShowFinalStatus(false);
    initialState();
    dispatch(setStageProcess('basicInformation'));
    setStage('basicInformation');
    setShowAlert(state => ({
      ...state,
      email: { message: '', showAlert: false },
      fullName: { message: '', showAlert: false },
      card: { message: '', showAlert: false, type: 'invalid' },
    }));
  };

  const validationBasicInformation = () => {
    if (basicInformation.email !== '' && basicInformation.fullName !== '') {
      if (validateEmail(basicInformation.email)) {
        return true;
      } else {
        setShowAlert(state => ({
          ...state,
          email: { message: 'enter a valid email address', showAlert: true },
          fullName: { message: '', showAlert: false },
        }));
        return false;
      }
    } else {
      setShowAlert(state => ({
        ...state,
        email: { message: 'Fill in the fields', showAlert: true },
        fullName: { message: 'Fill in the fields', showAlert: true },
      }));
      return false;
    }
  };

  const validationCardInformation = () => {
    if (cardInformation.cardNumber) {
      const { isValid, cardType } = validateCreditCardNumber(String(cardInformation.cardNumber));
      setShowAlert(state => ({
        ...state,
        card: { message: '', showAlert: false, type: cardType },
      }));
      if (isValid) {
        return true;
      } else {
        setShowAlert(state => ({
          ...state,
          card: { message: cardType, showAlert: true, type: cardType },
        }));
        return false;
      }
    } else {
      setShowAlert(state => ({
        ...state,
        card: { message: 'Enter a card number', showAlert: true, type: 'invalid' },
      }));
      return false;
    }
  };

  const validateFullDataCardInformation = () => {
    if (
      String(cardInformation.cardCvv) !== '' &&
      cardInformation.cardCvv !== null &&
      String(cardInformation.installments) !== '' &&
      cardInformation.installments !== null &&
      String(cardInformation.idNumber) !== '' &&
      cardInformation.idNumber !== null &&
      cardInformation.cardExpiration !== '' &&
      cardInformation.cardName !== '' &&
      cardInformation.typeId !== ''
    ) {
      return true;
    }
    return false;
  };

  const validationStagesFunction = () => {
    if (stage === 'basicInformation') {
      if (validationBasicInformation()) {
        dispatch(setBasicInformationState({ ...basicInformation }));
        setStage('cardInformation');
        dispatch(setStageProcess('cardInformation'));
        setShowAlert(state => ({
          ...state,
          email: { message: '', showAlert: false },
          fullName: { message: '', showAlert: false },
        }));
      }
    } else if (stage === 'cardInformation') {
      if (validationCardInformation()) {
        setStage('summaryInformation');
        dispatch(setStageProcess('summaryInformation'));
        dispatch(totalAmountValue());
        dispatch(setCardInformationState({ ...cardInformation }));
      }
    } else {
      validateCardInfo();
      dispatch(setStageProcess('finalStatus'));
      setFinalStatusState(validateFullDataCardInformation());
      dispatch(setFinalStatus(validateFullDataCardInformation()));
    }
  };

  const renderSummary = () => {
    return (
      <div className='static'>
        {stage === 'summaryInformation' && (
          <button
            className='btn btn-ghost absolute'
            onClick={() => {
              dispatch(setStageProcess('cardInformation'));
              setStage('cardInformation');
            }}>
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
            <div>{formatMoney(fullValue)}</div>
            <div>{formatMoney(deliveryCharges)}</div>
            <div className='text-indigo-500 font-semibold'>
              {formatMoney(fullValue + deliveryCharges)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const validateCardInfo = () => {
    setStage('basicInformation');
    dispatch(setStageProcess('basicInformation'));

    setIsModalOpen(false);

    setShowFinalStatus(true);
    setFinalStatusState(false);
    dispatch(setFinalStatus(false));

    element?.close();
  };

  const renderFinalStatus = () => {
    return (
      <div className='h-screen static'>
        <div className='h-full flex bg-violet-600 shadow-2xl'>
          <div className='px-10 flex justify-center items-center m-auto'>
            {finalStatusState ? (
              <div className='cardSecondary'>
                <div className='bg-white  text-green-600 shadow-lg shadow-green-400 my-2 flex self-center justify-center items-center mx-auto rounded-full w-28 h-28 '>
                  <img alt='paymentStatus' src={confirm} />
                </div>
                <div className='py-4'>
                  <h3 className='font-bold text-lg pb-4 text-center text-green-500 '>
                    Payment Successful!
                  </h3>
                  <div className='grid grid-rows-1 grid-flow-col gap-4 border-b pb-2 border-red-100'>
                    <div className='text-indigo-500 font-semibold'> Total Amount</div>
                    <div className='text-indigo-500 font-semibold'>{formatMoney(totalAmount)}</div>
                  </div>
                  <div className='py-2'>
                    <span className='my-2'>
                      Your transaction was successful thank you for choosing us.
                      <br />
                      &nbsp;
                    </span>
                    <span className='my-2'>
                      For details check below. Happy shopping!
                      <br />
                    </span>
                  </div>
                  <div className=' my-4 '>
                    <span>Your order</span>
                    <div className='grid grid-rows-3 grid-flow-col  '>
                      <div>Payment ID:</div>
                      <div>Date:</div>
                      <div>Time:</div>
                      <div>{generateId()}</div>
                      <div>{`${date.toLocaleDateString()}`}</div>
                      <div>{`${date.toLocaleTimeString()}`}</div>
                    </div>
                  </div>
                </div>
                <button className='btn btn-outline mb-2' onClick={handleCloseModal}>
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className='cardSecondary'>
                <div className='bg-white  text-red-600 shadow-lg shadow-red-400 my-2 flex self-center justify-center items-center mx-auto rounded-full w-28 h-28 '>
                  <img alt='paymentStatus' src={denied} />
                </div>
                <div className='py-4'>
                  <h3 className='font-bold text-lg pb-4 text-center text-red-500 '>
                    Payment Failed!
                  </h3>
                  <div className='grid grid-rows-1 grid-flow-col gap-4 border-b pb-2 border-red-100'>
                    <div className='text-indigo-500 font-semibold'> Total Amount</div>
                    <div className='text-indigo-500 font-semibold'>{formatMoney(totalAmount)}</div>
                  </div>
                  <div className='py-2'>
                    <span className='my-2'>
                      Hey, seems like there was some trouble. <br />
                      Confirm your card information and try again! &nbsp;
                    </span>
                  </div>
                  <div className=' my-4 '>
                    <div className='grid grid-rows-3 grid-flow-col  '>
                      <div>Payment ID:</div>
                      <div>Date:</div>
                      <div>Time:</div>
                      <div>{generateId()}</div>
                      <div>{`${date.toLocaleDateString()}`}</div>
                      <div>{`${date.toLocaleTimeString()}`}</div>
                    </div>
                  </div>
                </div>
                <button
                  className='btn btn-outline mb-2'
                  onClick={() => {
                    setStage('cardInformation');
                    dispatch(setStageProcess('cardInformation'));
                    setShowFinalStatus(false);
                  }}>
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const body = () => {
    return (
      <div className='bg-blue-50 min-h-[100vh] flex overflow-y-auto rounded-lg'>
        <div
          className={`flex py-8 flex-col container mx-auto h-[100vh] px-10 ${isModalOpen && 'blur-sm '}`}>
          <span className='text-indigo-600 font-semibold  text-2xl text-center pt-2'>
            {' '}
            Space Lamps
          </span>
          <div className='py-4 flex- flex-col text-center justify-center'>
            <Carousel />
            <span className='font-extralight text-gray-500 text-xs text-center'>
              Slide to see more
            </span>
            <div className='flex drop-shadow-lg  text-sm justify-between font-semibold bg-indigo-200 rounded-lg mx-4 text-white p-4'>
              <div>Space Lamps group</div>
              <div>{formatMoney(fullValue)}</div>
            </div>
          </div>
          <div className='flex'>
            <button className='card' onClick={() => dispatch(increment())}>
              +{' '}
            </button>
            <span className='w-10 text-center self-center'>{quantity}</span>
            <button
              className='card '
              onClick={() => {
                if (quantity > 1) dispatch(decrement());
              }}>
              -
            </button>
          </div>
          <div className='text-justify pt-2'>
            <br />
            Perfect space lamps made of sturdy wood and if you place it in a dark place can have too
            much light and exceeds expectations. <br />
            <br />
            Included: 1 Piece USB Night Light, 3D Table Lamp With LED Crystal Ball
          </div>

          <div className='p-8 mx-auto'>
            <button
              onClick={handleOpenModal}
              className='btn-primary shadow-lg shadow-indigo-400/50 items-center flex space-x-4'>
              <span className=''>Pay with credit card</span>
              <IconCreditCardPay className='' />
            </button>
            <dialog id='modalComponent' className='modal modal-bottom sm:modal-middle '>
              <div className='modal-box bg-indigo-100 space-y-2 text-gray-600'>
                {stage === 'basicInformation' ? (
                  <RenderBasicInformation
                    data={basicInformation}
                    setData={setBasicInformation}
                    showAlert={showAlert}
                  />
                ) : stage === 'cardInformation' ? (
                  <RenderCardInformation
                    data={cardInformation}
                    setData={setCardInformation}
                    setShowAlert={setShowAlert}
                    setStage={setStage}
                    showAlert={showAlert}
                  />
                ) : (
                  stage === 'summaryInformation' && renderSummary()
                )}
                <div className='modal-action space-x-4'>
                  <form method='dialog' className='flex items-center'>
                    <button className='flex items-center ' onClick={handleCloseModal}>
                      <span className='self-center items-center '>Close</span>
                    </button>
                  </form>
                  <button
                    className='btn btn-primary text-center items-center'
                    onClick={validationStagesFunction}>
                    {stage === 'basicInformation'
                      ? 'Continue'
                      : stage === 'summaryInformation'
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
