import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import RenderCardInformation from '../pages/BasicForm/CardForm';
import { store } from '../app/store';

describe('RenderCardInformation Component', () => {
  test('renders the component with initial card information', () => {
    const mockSetData = jest.fn();
    const mockSetStage = jest.fn();
    const mockSetShowAlert = jest.fn();

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <RenderCardInformation
          showAlert={{
            email: { message: 'Invalid email', showAlert: false },
            fullName: { message: 'Invalid full name', showAlert: false },
            card: { message: 'Invalid card', showAlert: false, type: 'visa' },
          }}
          data={{
            cardNumber: null,
            cardExpiration: '',
            cardCvv: null,
            cardName: '',
            typeId: '',
            idNumber: null,
            installments: null,
          }}
          setData={mockSetData}
          setStage={mockSetStage}
          setShowAlert={mockSetShowAlert}
        />
      </Provider>,
    );

    expect(getByText('Enter your card information')).toBeInTheDocument();

    expect(getByLabelText('Card')).toBeInTheDocument();
  });
});
