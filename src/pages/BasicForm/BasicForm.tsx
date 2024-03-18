import React from 'react';
import InputComponent from '../../components/Input';
import { IconBrandMastercard, IconBrandVisa } from '@tabler/icons-react';
import { BasicInformation, ParamsComponent } from '../../models/payment';

const RenderBasicInformation = ({ showAlert, data, setData }: ParamsComponent) => {
  const handleChangeBasicInformation = (key: 'email' | 'fullName', value: string) => {
    setData((state: BasicInformation) => ({ ...state, [key]: value }));
  };

  return (
    <>
      <h3 className='font-semibold text-base'>Enter your information</h3>
      <InputComponent
        alert={showAlert.email}
        key='email'
        id='email'
        label='Email'
        placeholder='aa@example.com'
        value={data.email}
        onChange={({ target }) => handleChangeBasicInformation('email', target.value)}
        type='email'
      />
      <InputComponent
        alert={showAlert.fullName}
        key='fullName'
        id='fullName'
        label='Full Name'
        placeholder='Chris Smith'
        value={data.fullName}
        onChange={({ target }) => handleChangeBasicInformation('fullName', target.value)}
        type='text'
      />
      <br />
      <h6 className='font-extralight text-sm '>We accept the following cards</h6>{' '}
      <div className='flex space-x-4'>
        <IconBrandVisa height={30} width={30} className='text-blue-700' />
        <IconBrandMastercard height={30} width={30} className='text-orange-500' />
      </div>
    </>
  );
};

export default RenderBasicInformation;
