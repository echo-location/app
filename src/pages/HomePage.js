import React from 'react'
import Button from '@mui/material/Button';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
function HomePage()
{
    return (
        <div>
        <h1>
            <EditLocationAltIcon sx={{ fontSize: 64}} />
        </h1>
        <center>
        <h1>
            Echo-Location
        </h1>
        <Button variant="contained" onClick={() => {window.location.href = "LostItems"}}>
        Enter
        </Button>
        </center>
        </div>
    );
};

export default HomePage;