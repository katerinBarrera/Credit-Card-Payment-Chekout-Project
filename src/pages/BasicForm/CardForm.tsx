import { useDispatch } from 'react-redux';
import { setStageProcess } from '../../features/counters/counterSlices';
import InputComponent from '../../components/Input';
import { AlertParams, CardInformation, ParamsComponentCards } from '../../models/payment';
import {
  IconArrowBack,
  IconBrandMastercard,
  IconBrandVisa,
  IconCircleX,
} from '@tabler/icons-react';
import { validateCreditCardNumber } from '../../helpers/helpers';

const RenderCardInformation = ({
  showAlert,
  setShowAlert,
  data,
  setData,
  setStage,
}: ParamsComponentCards) => {
  const dispatch = useDispatch();
  const handleChangeCardInformation = (
    key:
      | 'cardNumber'
      | 'cardExpiration'
      | 'cardCvv'
      | 'cardName'
      | 'typeId'
      | 'idNumber'
      | 'installments',
    value: number | string,
  ) => {
    setData((state: CardInformation) => ({ ...state, [key]: value }));
  };

  return (
    <>
      <div className='flex space-x-2 items-center'>
        <button
          className='btn btn-ghost'
          onClick={() => {
            setStage('basicInformation');
            dispatch(setStageProcess('basicInformation'));
          }}>
          <IconArrowBack />
        </button>
        <h3 className='font-bold text-lg'>Enter your card information</h3>
      </div>
      <div className='flex  justify-between'>
        <InputComponent
          alert={showAlert.card}
          key='cardNumber'
          label='Card'
          placeholder=''
          value={data?.cardNumber || ''}
          onChange={({ target }) => {
            handleChangeCardInformation('cardNumber', target.value);
            const type = validateCreditCardNumber(String(target.value)).cardType;
            if (type !== 'Invalid') {
              setShowAlert((state: AlertParams) => ({
                ...state,
                card: { message: '', showAlert: false, type: type },
              }));
            }
          }}
          type='number'
        />
        {String(data.cardNumber) !== '' && data.cardNumber !== null && (
          <div key={data.cardNumber} className='p-3'>
            {validateCreditCardNumber(String(data?.cardNumber)).cardType === 'Visa' && (
              <span className='text-blue-900'>
                <IconBrandVisa />
              </span>
            )}
            {validateCreditCardNumber(String(data?.cardNumber)).cardType === 'Mastercard' && (
              <span className='text-orange-400'>
                <IconBrandMastercard />
              </span>
            )}
            {validateCreditCardNumber(String(data?.cardNumber)).cardType === 'Invalid' && (
              <span className='text-red-600'>
                <IconCircleX />
              </span>
            )}
          </div>
        )}
      </div>
      <InputComponent
        key='cardExpiration'
        label='Expiration date'
        placeholder=''
        value={data?.cardExpiration || ''}
        onChange={({ target }) => handleChangeCardInformation('cardExpiration', target.value)}
        type='month'
      />
      <InputComponent
        key='cardCvv'
        label='CVC'
        type='number'
        placeholder='12-'
        value={data?.cardCvv || ''}
        onChange={({ target }) => handleChangeCardInformation('cardCvv', target.value)}
      />
      <InputComponent
        key='cardName'
        label='Card name'
        type='text'
        placeholder='Chris Smith'
        value={data?.cardName || ''}
        onChange={({ target }) => handleChangeCardInformation('cardName', target.value)}
      />
      <InputComponent
        key='aa'
        label='installments'
        type='number'
        placeholder='0'
        value={data?.installments || ''}
        onChange={({ target }) => handleChangeCardInformation('installments', target.value)}
      />

      <select
        className='inp-primary text-[13px] '
        value={data?.typeId || ''}
        onChange={e => {
          handleChangeCardInformation('typeId', Number(e.target.value));
        }}>
        <option value={''}>Pick one</option>
        <option value={1}>CC</option>
        <option value={2}>TI</option>
        <option value={3}>Passports</option>
      </select>
      <InputComponent
        key='installments'
        label='ID '
        type='number'
        placeholder='123-'
        value={data?.idNumber || ''}
        onChange={({ target }) => handleChangeCardInformation('idNumber', target.value)}
      />
      <div className='space-x-4'>
        <input
          type='checkbox'
          defaultChecked
          className=' accent-indigo-700 rounded-sm bg-white border-1 border-indigo-500'
        />
        <span>I accept terms and conditions</span>
      </div>
    </>
  );
};

export default RenderCardInformation;
