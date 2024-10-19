import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    creator: '', // Will be set by useEffect
    image: null, // Changed to handle file upload
    links: { github: '', liveDemo: '', other: '' },
    sourceCode: '',
    // collaborators:'',
    category: '',
    rating: 3,
    dateCreated: new Date().toISOString().substring(0, 10),
    lastUpdated: new Date().toISOString().substring(0, 10),
  });

  const getLoggedInUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      return user.id;
    }
    return null;
  };

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId) {
      setFormData((prevData) => ({ ...prevData, creator: userId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('links.')) {
      const linkType = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        links: { ...prevData.links, [linkType]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // FormData to handle image upload
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('technologies', formData.technologies);
    formDataToSend.append('creator', formData.creator);
    formDataToSend.append('image', formData.image); // Append the image
    formDataToSend.append('links[github]', formData.links.github);
    formDataToSend.append('links[liveDemo]', formData.links.liveDemo);
    formDataToSend.append('links[other]', formData.links.other);
    formDataToSend.append('sourceCode', formData.sourceCode);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('rating', formData.rating);
    formDataToSend.append('dateCreated', formData.dateCreated);
    formDataToSend.append('lastUpdated', formData.lastUpdated);

    try {
      let response = await fetch('http://localhost:5000/api/v1/add-project', {
        method: 'POST',
        body: formDataToSend, // Send the FormData object
      });

      if (response.ok) {
        alert('Data stored successfully!');
        navigate('/');
      } else {
        alert('Failed to store data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error occurred during submission.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 2, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Create a New Project
      </Typography>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <Box mb={2}>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Technologies (comma-separated)"
            name="technologies"
            variant="outlined"
            fullWidth
            value={formData.technologies}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="GitHub Link"
            name="links.github"
            variant="outlined"
            fullWidth
            value={formData.links.github}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Live Demo Link"
            name="links.liveDemo"
            variant="outlined"
            fullWidth
            value={formData.links.liveDemo}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Other Link"
            name="links.other"
            variant="outlined"
            fullWidth
            value={formData.links.other}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Source Code URL"
            name="sourceCode"
            variant="outlined"
            fullWidth
            value={formData.sourceCode}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Category (comma-separated)"
            name="category"
            variant="outlined"
            fullWidth
            value={formData.category}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Rating"
            name="rating"
            type="number"
            variant="outlined"
            fullWidth
            value={formData.rating}
            onChange={handleChange}
            inputProps={{ min: 1, max: 5 }}
          />
        </Box>
        <Box mb={2}>
          <Typography variant="body1">Upload Image</Typography>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Project
        </Button>
      </form>
    </Paper>
  );
};

export default CreateProject;
