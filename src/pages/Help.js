import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Bar from "../components/Bar/Bar";
import {Link} from "react-router-dom";
function Help()
{
    return (
    <div className="LostItemsPage">
    <Bar />
    <h1>
        Help Page
    </h1>
    <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        FAQ #1 - Location of Lost Item
        </AccordionSummary>

        <AccordionDetails>
        We recommend only reporting things lost on UCLA Campus, or by UCLA students.
        </AccordionDetails>

      </Accordion>
      <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        FAQ #2 - Theft Protection
        </AccordionSummary>

        <AccordionDetails>
        Verify ownership of lost items before returning them.
        </AccordionDetails>

      </Accordion>
      <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        FAQ #3 - 
        </AccordionSummary>

        <AccordionDetails>
        Lorem Ipsum
        </AccordionDetails>

      </Accordion>
      <Accordion>

        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
        How to Create an Account
        </AccordionSummary>

        <AccordionDetails>
        <Link to="/createAccount">Click Here.</Link>
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