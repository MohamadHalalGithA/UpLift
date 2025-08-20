import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Button, TextField, Stack,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { fetchData, fetchAllData } from '../utils/fetchData';

const SearchExercises = ({ setExercises }) => {
  const [search, setSearch] = useState('');
  const [allExercises, setAllExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('');
  const [equipment, setEquipment] = useState('');
  const [sort, setSort] = useState('');

  // Hardcoded equipment list
  const equipmentOptions = [
    'barbell',
    'dumbbell',
    'other',
    'body_only',
    'cable',
    'machine',
    'kettlebells',
    'bands',
  ];

  // Hardcoded body parts list
  const bodyPartsList = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower back',
    'middle back',
     'neck',
    'quadriceps',
    'shoulders',
    'triceps',
    'traps',
  ];

  // Fetch all exercises initially
  useEffect(() => {
    const loadData = async () => {
      const fetched = await fetchAllData();
      setAllExercises(fetched);
      setExercises(fetched);
    };
    loadData();
  }, [setExercises]);

  // Apply filters
  const applyFilters = () => {
    let results = [...allExercises];

    if (search) {
      results = results.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (bodyPart) {
      results = results.filter(
        (x) => x.primaryMuscles[0] && x.primaryMuscles[0].toLowerCase() === bodyPart
      );
    }
    if (equipment) {
      results = results.filter(
        (x) => x.equipment && x.equipment.toLowerCase() === equipment
      );
    }
    if (sort === 'az') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === 'za') {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }

    setExercises(results);
  };

  // Re-filter whenever dependencies change
  useEffect(() => {
    applyFilters();
  }, [search, bodyPart, equipment, sort]);

  return (
    <Stack id = "exercisesPath" alignItems="center" mt="37px" p="20px" width="100%">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Find the best Exercises
      </Typography>

      {/* Search Input */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap="10px"
        width="100%"
        maxWidth="1170px"
        mb="30px"
        justifyContent={'center'}
      >
        <TextField
          sx={{
            '& .MuiInputBase-input': {
              fontWeight: '700',
              color: 'white',
              caretColor: 'white',
            },
            width: { xs: '100%', sm: '500px' },
            backgroundColor: '#1e1e1e',
            borderRadius: '4px',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Exercises"
        />
        
      </Box>

      {/* Dropdown Filters */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap="20px"
        width="100%"
        maxWidth="1170px"
        mb="50px"
      >
       
        <FormControl fullWidth sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#fff' }}>Body Part</InputLabel>
          <Select
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            label="Body Part"
            sx={{ backgroundColor: '#1e1e1e', color: '#fff' }}
          >
            <MenuItem value="">All</MenuItem>
            {bodyPartsList.map((part) => (
              <MenuItem key={part} value={part}>
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Equipment Filter */}
        <FormControl fullWidth sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#fff' }}>Equipment</InputLabel>
          <Select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            label="Equipment"
            sx={{ backgroundColor: '#1e1e1e', color: '#fff' }}
          >
            <MenuItem value="">All</MenuItem>
            {equipmentOptions.map((eq) => (
              <MenuItem key={eq} value={eq}>
                {eq.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Filter */}
        <FormControl fullWidth sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#fff' }}>Sort</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort"
            sx={{ backgroundColor: '#1e1e1e', color: '#fff' }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="az">A - Z</MenuItem>
            <MenuItem value="za">Z - A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default SearchExercises;
