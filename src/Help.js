import React from 'react'
import BarDrawer from "./BarDrawer";
import "./App.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
function Help()
{
    return (
    <div className="LostItemsPage">
    <BarDrawer />
    <h1>
        Help Page
    </h1>
    <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        FAQ #1
        </AccordionSummary>

        <AccordionDetails>
        We recommend only reporting things lost on UCLA Campus, or by UCLA students.
        </AccordionDetails>

      </Accordion>
      <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        FAQ #2
        </AccordionSummary>

        <AccordionDetails>
        Verify ownership of lost items before returning them.
        </AccordionDetails>

      </Accordion>
      <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        FAQ #3
        </AccordionSummary>

        <AccordionDetails>
        Do not exchange good for monetary services.
        </AccordionDetails>

      </Accordion>
      <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        How to Create an Account?
        </AccordionSummary>

        <AccordionDetails>
        Click Here.
        </AccordionDetails>

      </Accordion>
      <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        How to Report an Item
        </AccordionSummary>

        <AccordionDetails>
        Do the Following.
        </AccordionDetails>

      </Accordion>
    </div>
    );
}


export default Help;