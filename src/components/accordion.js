import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function SimpleAccordion(props) {
	const convertTime = (inputSeconds) => {
		inputSeconds = inputSeconds / 1000;
		var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
		t.setUTCSeconds(inputSeconds);
		return t.toUTCString();
	};

	const printMissingEnchants = (raid) => {
		var missingEnchants = [];
		for (var key in raid.enchantScore) {
			missingEnchants.push(key);
		}
		return missingEnchants.map((enchant) => {
			return (
				<Grid item>
					<Stack>
						{/* <img
							width="64"
							height="64"
							alt=""
							src={
								"https://static.wikia.nocookie.net/wowpedia/images/b/b7/Ui-paperdoll-slot-" +
								enchant.charAt(0).toLowerCase() +
								enchant.slice(1) +
								".png"
							}
						/>{" "} */}
						<h5>{enchant}</h5>
					</Stack>
				</Grid>
			);
		});
	};

	const buildAccordion = () => {
		const myData = []
			.concat(props.foundRaids)
			.sort((a, b) => (a.startTime > b.startTime ? -1 : b.startTime > a.startTime ? 1 : 0));
		return myData.map((raid) => {
			return (
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<Stack>
										<div>
											<h4>{raid.encounterName}</h4>
										</div>
										<div>{convertTime(raid.startTime)}</div>
									</Stack>
								</Grid>
								<Grid item xs={2}>
									<Stack>
										<div>
											<h4>Enchants</h4>
										</div>
										<div>{9 - Object.keys(raid.enchantScore).length} / 9</div>
									</Stack>
								</Grid>
								<Grid item xs={2}>
									<Stack>
										<div>
											<h4>Buffs</h4>
										</div>
										<div>{raid.buffScore} / 3</div>
									</Stack>
								</Grid>
								<Grid item xs={3}>
									<Stack>
										<div>
											<h4>Bracket Parse</h4>
										</div>
										<div>{raid.percentile.toString().split(".")[0]} / 100</div>
									</Stack>
								</Grid>
							</Grid>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<Stack>
							<Box>
								<Stack>
									<h4>Enchants Missing:</h4>
									<Grid container spacing={2}>
										{printMissingEnchants(raid)}
									</Grid>
								</Stack>
							</Box>
							<a
								rel="noreferrer"
								href={
									"https://classic.warcraftlogs.com/reports/" +
									raid.reportID +
									"#fight=" +
									raid.fightID +
									"&type=summary"
								}
								target="_blank"
							>
								View raid on Warcraftlogs
							</a>
						</Stack>
					</AccordionDetails>
				</Accordion>
			);
		});
	};

	return <div>{buildAccordion()}</div>;
}
