import { TIMEOUT_SECONDS } from "./config.js";

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long!`));
    }, seconds * 1000);
  });
};

export const AJAX = async function (apiUrl, queryType, apiKey) {
  try {
    const fetchData = await fetch(
      `${apiUrl}/forecast?${queryType}&appid=${apiKey}&units=metric`
    );

    const response = await Promise.race([fetchData, timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
