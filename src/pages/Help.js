import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Link } from "react-router-dom";
function Help() {
  return (
    <div className="LostItemsPage">
      <h1>Help Page</h1>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          FAQ #1 - When to Report
        </AccordionSummary>

        <AccordionDetails>
          We recommend only reporting items lost on UCLA Campus, or by UCLA students (ex. student IDs)
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          FAQ #2 - How to Verify Ownership
        </AccordionSummary>

        <AccordionDetails>
          Please verify ownership of lost items before returning them. This can include photos of owner with item or being able to name definitive features.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          FAQ #3 - Items of a Sensitive Nature
        </AccordionSummary>

        <AccordionDetails>
          If an item should not be posted online, default to reporting it to UCPD.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          How to Create an Account
        </AccordionSummary>

        <AccordionDetails>
          <Link to="/Account">Click Here.</Link>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          How to Report an Item
        </AccordionSummary>

        <AccordionDetails>
          <Link to="/Login?Page=ReportItem">Click here</Link>, and follow the steps on the page.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          How to Search for an Item
        </AccordionSummary>

        <AccordionDetails>
          <Link to="/LostItems">Click here</Link>, and use our search feature. If you find your item, simply contact the finder.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Help;
