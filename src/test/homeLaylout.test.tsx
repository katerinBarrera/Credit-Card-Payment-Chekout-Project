import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Principal from '../pages/Home';

describe('Principal Component', () => {
  test('renders Principal component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Principal />
      </Provider>,
    );

    expect(getByText('Space Lamps')).toBeInTheDocument();
    expect(getByText('Space Lamps group')).toBeInTheDocument();
    expect(getByText('Pay with credit card')).toBeInTheDocument();
  });

  test('increments and decrements quantity when buttons are clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Principal />
      </Provider>,
    );

    const incrementButton = getByText('+');
    const decrementButton = getByText('-');
    const quantityDisplay = getByText('1');

    fireEvent.click(incrementButton);
    expect(quantityDisplay.textContent).toBe('2');

    fireEvent.click(decrementButton);
    expect(quantityDisplay.textContent).toBe('1');
  });
});
