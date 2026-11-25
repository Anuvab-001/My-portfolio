export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

export const MAX_PROFILE_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

export function validateProfileImageFile(file: {
  type: string;
  size: number;
  name?: string;
}): ImageValidationResult {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])) {
    return {
      valid: false,
      error: 'Please select a JPG, PNG, WebP, or GIF image file.',
    };
  }
  if (file.size <= 0) {
    return {
      valid: false,
      error: 'The selected image file appears to be empty.',
    };
  }
  if (file.size > MAX_PROFILE_IMAGE_BYTES) {
    return {
      valid: false,
      error: 'Image size must be 5 MB or smaller.',
    };
  }
  return { valid: true };
}

export interface ContactDraft {
  name: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactDraft, string>>;
}

export function validateContactDraft(draft: ContactDraft): ContactValidationResult {
  const errors: Partial<Record<keyof ContactDraft, string>> = {};
  if (!draft.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!draft.subject.trim()) {
    errors.subject = 'Please enter a short subject.';
  }
  if (draft.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
