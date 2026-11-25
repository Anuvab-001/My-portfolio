import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProfileImageFile, validateContactDraft } from './profileImage';

test('accepts valid PNG/JPEG profile image under 5 MB', () => {
  const res = validateProfileImageFile({ type: 'image/jpeg', size: 420_000, name: 'photo.jpg' });
  assert.equal(res.valid, true);
});

test('rejects unsupported file formats and oversized images', () => {
  const badType = validateProfileImageFile({ type: 'application/pdf', size: 1000, name: 'cv.pdf' });
  assert.equal(badType.valid, false);
  assert.ok(badType.error);

  const tooBig = validateProfileImageFile({ type: 'image/png', size: 6 * 1024 * 1024, name: 'big.png' });
  assert.equal(tooBig.valid, false);
  assert.ok(tooBig.error);
});

test('validates contact form fields strictly', () => {
  const invalid = validateContactDraft({ name: '', subject: 'Hi', message: 'short' });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.message);

  const valid = validateContactDraft({
    name: 'Rahim',
    subject: 'Project Inquiry',
    message: 'Hello Anuvab, I reviewed your C projects and would like to connect.',
  });
  assert.equal(valid.valid, true);
});
