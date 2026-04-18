import DOMPurify from 'dompurify';

/**
 * Standard Sanitization for all User-Generated Content
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [], // No HTML allowed for most Lead/Ticket fields
    ALLOWED_ATTR: [],
  });
};

/**
 * Sanitization for rich text if ever needed
 */
export const sanitizeRichText = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'li', 'ol'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};
