import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryGrid = ({ categories }) => {
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
          <Card>
            <CardActionArea component={Link} to={`/category/${category.name}`}>
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
