// fetchdata.js
import axios from 'axios';

const API_HOST = process.env.REACT_APP_RAPIDAPI_EXERCISE_HOST || 'exercise-db-fitness-workout-gym.p.rapidapi.com';
const API_KEY = process.env.REACT_APP_RAPIDAPI_EXERCISE_KEY || '';

export const fetchData = async (search) => {
  try {
    const { data } = await axios.get(
      `https://${API_HOST}/exercises/filter`,
      {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    );

    const exercisesArray = Array.isArray(data) ? data : [];
    return exercisesArray.filter((exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchAllData = async () => {
  try {
    const { data } = await axios.get(
      `https://${API_HOST}/exercises/filter`,
      {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    );

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching all data:', error);
    return [];
  }
};
