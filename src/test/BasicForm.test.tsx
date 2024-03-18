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
    email: 'test@example.com',
    fullName: 'John Doe',
  };

  const setData = jest.fn();

  const { getByText, getByLabelText } = render(
    <RenderBasicInformation showAlert={showAlert} data={data} setData={setData} />,
  );

  expect(getByText('Enter your information')).toBeInTheDocument();
  expect(getByLabelText('Email')).toHaveValue('test@example.com');
  expect(getByLabelText('Full Name')).toHaveValue('John Doe');
});

// test('should update BasicInformation data when inputs change', () => {
//   const setData = jest.fn();
//   const showAlert = {
//     email: { message: 'Invalid email', showAlert: false },

//     fullName: { message: 'Invalid full name', showAlert: false },
//     card: { message: 'Invalid card', showAlert: false, type: 'visa' },
//   };
//   const { getByLabelText } = render(
//     <RenderBasicInformation
//       showAlert={showAlert}
//       data={{ email: '', fullName: '' }}
//       setData={setData}
//     />,
//   );

//   fireEvent.change(getByLabelText('Email'), { target: { value: 'callmeplease@example.com' } });
//   fireEvent.change(getByLabelText('Full Name'), { target: { value: 'Katerin Barrera' } });

//   expect(setData).toHaveBeenCalledTimes(2);
//   expect(setData).toHaveBeenCalledWith({
//     email: 'callmeplease@example.com',
//     fullName: 'Katerin Barrera',
//   });
// });
