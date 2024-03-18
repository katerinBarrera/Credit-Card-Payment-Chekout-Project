import {
  generateId,
  formatMoney,
  validateEmail,
  validateCreditCardNumber,
} from '../helpers/helpers';

describe('Helper Functions', () => {
  describe('generateId', () => {
    it('should generate a random ID between 100000000 and 999999999', () => {
      const id = generateId();
      expect(id).toBeGreaterThanOrEqual(100000000);
      expect(id).toBeLessThanOrEqual(999999999);
    });
  });

  describe('formatMoney', () => {
    it('should format the amount correctly with default parameters', () => {
      const amount = 1000;
      const formatted = formatMoney(amount);
      expect(formatted).toBe('$1,000.00');
    });

    it('should format the amount correctly with custom parameters', () => {
      const amount = 1000;
      const formatted = formatMoney(amount, '€', ',', '.');
      expect(formatted).toBe('€1.000,00');
    });
  });

  describe('validateEmail', () => {
    it('should return true for a valid email', () => {
      const validEmail = 'test@example.com';
      const isValid = validateEmail(validEmail);
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid email', () => {
      const invalidEmail = 'invalid-email';
      const isValid = validateEmail(invalidEmail);
      expect(isValid).toBe(false);
    });
  });

  describe('validateCreditCardNumber', () => {
    it('should return Visa card type for a valid Visa card number', () => {
      const validVisaCardNumber = '4111111111111111';
      const validationResult = validateCreditCardNumber(validVisaCardNumber);
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.cardType).toBe('Visa');
    });

    it('should return Mastercard card type for a valid Mastercard card number', () => {
      const validMastercardCardNumber = '5555555555554444';
      const validationResult = validateCreditCardNumber(validMastercardCardNumber);
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.cardType).toBe('Mastercard');
    });

    it('should return Invalid card type for an invalid card number', () => {
      const invalidCardNumber = '1234567890123456';
      const validationResult = validateCreditCardNumber(invalidCardNumber);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.cardType).toBe('Invalid');
    });
  });
});
