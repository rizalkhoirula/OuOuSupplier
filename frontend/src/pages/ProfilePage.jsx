import React from 'react';
import { Container, Typography } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      {/* Profile content goes here */}
    </Container>
  );
};

export default ProfilePage;
