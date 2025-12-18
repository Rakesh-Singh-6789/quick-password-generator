const passwordInput = document.getElementById('password');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:.<>?';

function generatePassword() {
  const length = parseInt(lengthInput.value);
  let chars = '';

  if (uppercaseCheckbox.checked) chars += UPPERCASE;
  if (lowercaseCheckbox.checked) chars += LOWERCASE;
  if (numbersCheckbox.checked) chars += NUMBERS;
  if (symbolsCheckbox.checked) chars += SYMBOLS;

  if (!chars) {
    passwordInput.value = '';
    return;
  }

  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[values[i] % chars.length];
  }

  passwordInput.value = password;
}

async function copyToClipboard() {
  if (!passwordInput.value) return;

  try {
    await navigator.clipboard.writeText(passwordInput.value);
    copyBtn.textContent = 'Copied';
    setTimeout(() => copyBtn.textContent = 'Copy', 1000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

window.addEventListener('load', generatePassword);

