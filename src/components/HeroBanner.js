// HeroBanner.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import Banner from "../assets/images/GymBanner-Photoroom.png";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/calculator");
  };

  

  return (
    <Box
      className="hero-ban-cont"
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        mt: { lg: "100px", xs: "20px" },
        p: "20px",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: { xs: "center", lg: "left" },
      }}
    >
      {/* Left Section (Text + Buttons) */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems={{ xs: "center", lg: "flex-start" }}
        width={{ xs: "100%", lg: "50%" }}
      >
        <Typography
          className="mobfont1"
          color="#7958896e"
          fontWeight="600"
          fontSize="15px"
          mb="20px"
        >
          UpLift
        </Typography>

        <Typography
          className="mobfont2"
          fontWeight="700"
          sx={{ fontSize: { lg: "44px", xs: "36px" } }}
        >
          Sweat, Smile <br /> and Repeat
        </Typography>

        <Typography className="mobfont3" fontSize="22px" lineHeight="35px" mt="10px">
          Check out the most effective exercises
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap="20px"
          mt="25px"
          width="100%"
          className="buttonsO"
        >
          <Box width={{ xs: "100%", sm: "auto" }}>
            <button
              style={{
                cursor: "pointer",
                width: "100%",
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                const el = document.getElementById("exercisesPath");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Exercises
            </button>
          </Box>

          <Box width={{ xs: "100%", sm: "auto" }}>
            <button
              onClick={handleClick}
              style={{
                cursor: "pointer",
                width: "100%",
                whiteSpace: "nowrap",
              }}
            >
              Calculate BMI
            </button>
          </Box>
        </Box>

        <Typography
          className="tp"
          fontWeight={600}
          color="#795889"
          sx={{
            opacity: 0.1,
            display: { lg: "block", xs: "none" },
            mt: "40px",
          }}
          fontSize="200px"
        >
          Exercise
        </Typography>
      </Box>

      {/* Right Section (Image) */}
      <Box
        component="img"
        src={Banner}
        alt="Gym Banner"
        className="hero-banner-img"
        sx={{
          width: { xs: "90%", sm: "400px", lg: "500px" },
          height: "auto",
          mt: { xs: "30px", lg: "0" },
          borderBottomLeftRadius: "120px",
          borderBottomRightRadius: "150px",
          boxShadow: `rgba(255, 4, 176, 0.25) 0px 50px 100px -20px,
                      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
                      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
          transition: "all ease-in-out 250ms",
          objectFit: "cover",
          '&:hover': {
            transform: "scale(1.02)",
          },
          display: { xs: 'none', sm: 'block' }, // hides on ≤ 400px
        }}
      />
    </Box>
  );
};

export default HeroBanner;
