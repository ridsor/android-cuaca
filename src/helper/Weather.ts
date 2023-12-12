export const getWeather = async (locationKey: string) => {
  try {
    const dataWeather = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=COjK0Fselq4JKAdsESjwsYrWRjygYGuG&language=id-id&details=true`,
    ).then(res => res.json());

    return dataWeather.DailyForecasts;
  } catch (e) {
    console.error(e);
  }
};

export const convertionFahrenheit = (weather: number) => {
  const result = ((weather - 32) * 5) / 9;
  return Math.round(result);
};

export const dateConvertion = (date: string) => {
  const result = new Date(date);

  return Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(result);
};

export const dateDescriptionConverstion = (date: string) => {
  const target = new Date(date);
  const today = new Date();
  target.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  if (target.getTime() === today.getTime()) {
    return 'Hari ini';
  } else if (target.getTime() === today.getTime() + 1000 * 3600 * 24) {
    return 'Besok';
  } else {
    return Intl.DateTimeFormat('id-ID', {weekday: 'long'}).format(target);
  }
};
