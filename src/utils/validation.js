export function requiredField(value) {
  return value && String(value).trim() ? true : 'This field is required';
}
