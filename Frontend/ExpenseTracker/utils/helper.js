// helpers.js

// Parses an email string and returns true if it matches a basic email pattern.
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Gets the initials from a full name, taking the first letter of the first two words.
export const getInitials = (name) => {
  if (!name) return "";
  
  const words = name.split(" ");
  let initials = "";
  
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  
  return initials.toUpperCase();
};
