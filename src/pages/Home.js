import React, {useState} from 'react'
import { Box } from '@mui/material'
import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'
import { fetchAllData } from '../utils/fetchData'
const Home = () => {
  const [exercises, setExercises] = useState([]);
  // Fetch all exercises data on initial render
  React.useEffect(() => {
    const fetchExercises = async () => {
      const data = await fetchAllData();
      console.log(data);
      setExercises(data);
    };
    fetchExercises();
  }, []);
  return (
    <Box>
       <HeroBanner/>
       <SearchExercises exercises = {exercises}
       
                        setExercises = {setExercises}/>
       <Exercises
       exercises = {exercises}
       
                        setExercises = {setExercises}/>
    </Box>
  )
}

export default Home