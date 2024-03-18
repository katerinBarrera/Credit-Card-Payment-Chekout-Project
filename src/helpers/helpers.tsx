export const generateId = () => {
  const min = 100000000;
  const max = 999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatMoney = (
  amount: number,
  currencySymbol: string = '$',
  decimalSeparator: string = '.',
  thousandsSeparator: string = ',',
) => {
  const fixedAmount = amount.toFixed(2);
  const parts = fixedAmount.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  const formattedAmount = currencySymbol + integerPart + decimalSeparator + parts[1];
  return formattedAmount;
};

export const validateEmail = (correo: string): boolean => {
  const expressionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expressionRegular.test(correo);
};

interface ValidationResult {
  isValid: boolean;
  cardType: string;
}

export const validateCreditCardNumber = (cardNumber: string): ValidationResult => {
  const trimmedCardNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  if (!/^\d+$/.test(trimmedCardNumber)) {
    return { isValid: false, cardType: 'Invalid' };
  }

  if (trimmedCardNumber.length < 13 || trimmedCardNumber.length > 19) {
    return { isValid: false, cardType: 'Invalid' };
  }

  if (/^4/.test(trimmedCardNumber)) {
    return { isValid: true, cardType: 'Visa' };
  } else if (/^5[1-5]/.test(trimmedCardNumber)) {
    return { isValid: true, cardType: 'Mastercard' };
  }

  return { isValid: false, cardType: 'Invalid' };
};
