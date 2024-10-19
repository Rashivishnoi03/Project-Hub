import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer/Footer';
import Search from '../../Component/Search';
import './Home.css';
import { Box, Container, Button, Typography, Card, CardActions, CardMedia, CardContent } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect triggered');
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log('Fetched Projects:', data);
        setProjects(data.projects); // Set the projects array to state
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Your Projects
        </Typography>
        <div className='search-contain'>
           <Search/>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Button className='add-btn-search' variant="contained" color="primary" component={Link} to="/add-project">
            Add New Project
          </Button>
        </Box>
        </div>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project._id} sx={{ transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.image.length > 0 ? project.image[0] : 'https://via.placeholder.com/140'}
                  alt={project.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/projects/${project._id}`}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No projects found.
            </Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
