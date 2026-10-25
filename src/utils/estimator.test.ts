import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProjectEstimate,
  validateQuoteForm,
  formatPhoneNumber,
  isCityInPrimaryCoverage,
} from './estimator.ts';

test('calculateProjectEstimate computes realistic cost ranges for paver patio', () => {
  const result = calculateProjectEstimate({
    serviceType: 'paver_patio',
    squareFootage: 400,
    materialTier: 'standard',
    sitePrepLevel: 'easy',
  });

  assert.ok(result.minCost >= 7000, `Expected minCost >= 7000, got ${result.minCost}`);
  assert.ok(result.maxCost <= 15000, `Expected maxCost <= 15000, got ${result.maxCost}`);
  assert.ok(result.minCost < result.maxCost, 'minCost should be less than maxCost');
  assert.equal(result.recommendedBaseDepthInches, 8);
  assert.ok(result.breakdown.materialsMin > 0);
  assert.ok(result.breakdown.laborMin > 0);
});

test('calculateProjectEstimate adjusts for luxury tier and complex site prep', () => {
  const baseResult = calculateProjectEstimate({
    serviceType: 'paver_patio',
    squareFootage: 400,
    materialTier: 'standard',
    sitePrepLevel: 'easy',
  });

  const premiumResult = calculateProjectEstimate({
    serviceType: 'paver_patio',
    squareFootage: 400,
    materialTier: 'luxury',
    sitePrepLevel: 'complex',
  });

  assert.ok(premiumResult.minCost > baseResult.minCost * 1.5, 'Luxury + complex prep should cost noticeably more');
});

test('validateQuoteForm catches missing fields and invalid phone/email', () => {
  const invalid = validateQuoteForm({
    fullName: '',
    phone: '123',
    email: 'not-an-email',
    city: '',
    service: '',
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.city);
  assert.ok(invalid.errors.service);
});

test('validateQuoteForm accepts valid homeowner inquiry', () => {
  const valid = validateQuoteForm({
    fullName: 'David Miller',
    phone: '(630) 555-0199',
    email: 'dmiller@example.com',
    city: 'Aurora',
    service: 'Paver Patio Installation',
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('formatPhoneNumber formats raw 10 digits properly', () => {
  assert.equal(formatPhoneNumber('6308096835'), '(630) 809-6835');
});

test('isCityInPrimaryCoverage checks Aurora and Fox Valley cities', () => {
  assert.equal(isCityInPrimaryCoverage('Aurora'), true);
  assert.equal(isCityInPrimaryCoverage('naperville'), true);
  assert.equal(isCityInPrimaryCoverage('Oswego'), true);
  assert.equal(isCityInPrimaryCoverage('Springfield'), false);
});
