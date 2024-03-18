import React from 'react';
import { render } from '@testing-library/react';
import RenderBasicInformation from '../pages/BasicForm/BasicForm';

test('renders basic information component with initial data', () => {
  const showAlert = {
    email: { message: 'Invalid email', showAlert: false },
    fullName: { message: 'Invalid full name', showAlert: false },
    card: { message: 'Invalid card', showAlert: false, type: 'visa' },
  };

  const data = {
    email: 'callmeplease@example.com',
    fullName: 'Kate',
  };

  const setData = jest.fn();

  const { getByText, getByLabelText } = render(
    <RenderBasicInformation showAlert={showAlert} data={data} setData={setData} />,
  );

  expect(getByText('Enter your information')).toBeInTheDocument();
  expect(getByLabelText('Email')).toHaveValue('callmeplease@example.com');
  expect(getByLabelText('Full Name')).toHaveValue('Kate');
});
