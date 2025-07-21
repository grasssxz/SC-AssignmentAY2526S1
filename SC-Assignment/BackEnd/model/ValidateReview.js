const sanitizeHtml = require("sanitize-html");

function validateReviewInput(reviewText) {
  if (typeof reviewText !== 'string' || reviewText.trim() === '') {
    return { valid: false, message: "Review cannot be empty." };
  }

  // This removes all tags — critical!
  const sanitized = sanitizeHtml(reviewText, {
    allowedTags: [],
    allowedAttributes: {}
  });

  return { valid: true, sanitized };
}

function validateRating(rating) {
  const parsed = parseInt(rating);
  if (isNaN(parsed) || parsed < 1 || parsed > 5) {
    return { valid: false, message: "Rating must be between 1 and 5." };
  }
  return { valid: true, sanitized: parsed };
}

module.exports = {
  validateReviewInput,
  validateRating
};
