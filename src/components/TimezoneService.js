const baseUrl = 'http://datetimeapi.runasp.net/api/time';

export const getTimezones = async () => {
  const response = await fetch(`${baseUrl}/timezones`);
  if (!response.ok) {
    throw new Error('Failed to fetch timezones');
  }
  return await response.json();
};

export const getSelectedTime = async (timezone) => {
  const response = await fetch(`${baseUrl}?timezone=${timezone}`);
  if (!response.ok) {
    throw new Error('Failed to fetch selected timezone time');
  }
  return await response.json();
};