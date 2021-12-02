import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Divider } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Link } from "react-router-dom";
import "./Help.css";

import { styled } from "@mui/material/styles";

function Help() {
  return (
    <div className="LostItemsPage">
      <h1 className="sub-heading">Help</h1>
      <h1 className="heading">For your frequently asked.</h1>
      <div style={{ padding: "3rem 1.5rem" }}>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            FAQ #1 - When to Report
          </StyledAccordionSummary>
          <Divider />
          <AccordionDetails>
            We recommend only reporting items lost on UCLA Campus, or by UCLA
            students (ex. student IDs)
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            FAQ #2 - How to Verify Ownership
          </StyledAccordionSummary>
          <Divider />
          <AccordionDetails>
            Please verify ownership of lost items before returning them. This
            can include photos of owner with item or being able to name
            definitive features.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            FAQ #3 - Items of a Sensitive Nature
          </StyledAccordionSummary>
          <Divider />
          <AccordionDetails>
            If an item should not be posted online, default to reporting it to
            UCPD.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            How to Create an Account
          </StyledAccordionSummary>
          <Divider />
          <AccordionDetails>
            <Link to="/Account">Click here</Link>, and ensure you provide the
            necessary prerequisites.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            How to Report an Item
          </StyledAccordionSummary>
          <Divider />
          <AccordionDetails>
            <Link to="/Login?Page=ReportItem">Click here</Link>, and follow the
            steps on the page.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            How to Search for an Item
          </StyledAccordionSummary>
          <Divider />{" "}
          <AccordionDetails>
            <Link to="/LostItems">Click here</Link>, and use our search feature.
            If you find your item, simply contact the finder.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "#152c939c",
}));
export default Help;
