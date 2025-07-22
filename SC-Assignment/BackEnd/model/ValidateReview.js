function validateReviewInput(reviewText) {
  if (typeof reviewText !== 'string' || reviewText.trim() === '') {
    return { valid: false, message: "Review cannot be empty." };
  }

  return { valid: true, sanitized: reviewText.trim() };
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
