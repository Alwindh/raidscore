import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import RaidAccordion from "../components/accordion";

export default function MyComponent(props) {
	const { charName } = useParams();
	const [pageStatus, setPageStatus] = useState("Loading raid ");
	const [loading, setLoading] = useState(true);
	const [runner, setRunner] = useState(1);
	const [foundRaids, setFoundRaids] = useState([]);

	const loadData = async () => {
		const targetUrl =
			"https://classic.warcraftlogs.com:443/v1/parses/character/" +
			charName +
			"/Nethergarde-Keep/EU?bracket=-1&includeCombatantInfo=true&api_key=0362a54ad91efa72541d961894d90ac5";
		var lastRaids = await asyncRequest(targetUrl);
		if (lastRaids[0].spec.includes("Holy") || lastRaids[0].spec.includes("Resto")) {
			lastRaids = await asyncRequest(targetUrl + "&metric=hps");
		}
		lastRaids = filterData(lastRaids);
		await loopData(lastRaids);
	};

	const filterData = (inputList) => {
		inputList.sort((a, b) => (a.startTime > b.startTime ? -1 : b.startTime > a.startTime ? 1 : 0));
		const slicedArray = inputList.slice(0, 20);
		return slicedArray;
	};

	const loopData = async (inputData) => {
		var testRunner = 1;
		await Promise.all(
			inputData.map(async (element) => {
				const raidElement = await scanRaid(element);
				setRunner(testRunner);
				setFoundRaids((foundRaids) => [...foundRaids, raidElement]);
				testRunner++;
				console.log(element);
			})
		);
		setLoading(false);
	};

	const scanRaid = async (raidInfo) => {
		const enchantScore = await checkEnchants(raidInfo);
		const buffScore = await checkBuffs(raidInfo);
		raidInfo["enchantScore"] = enchantScore;
		raidInfo["buffScore"] = buffScore;
		return raidInfo;
		// console.log("");
		// console.log(raidInfo);
		// console.log(enchantScore);
		// console.log(buffScore);
		// console.log("");
	};

	const checkBuffs = async (raidInfo) => {
		const raidId = await getPlayerRaidId(raidInfo);
		const targetUrl =
			"https://classic.warcraftlogs.com:443/v1/report/tables/buffs/" +
			raidInfo.reportID +
			"?start=0&end=9639346538236&by=source&sourceid=" +
			raidId +
			"&targetid=" +
			raidId +
			"&encounter=" +
			raidInfo.encounterID +
			"&api_key=0362a54ad91efa72541d961894d90ac5";
		const buffResponse = await asyncRequest(targetUrl);
		var foundBuffs = 0;
		for (const buff of buffResponse.auras) {
			if (buff.name.includes("Well Fed")) {
				foundBuffs++;
			} else if (buff.name.includes("Flask")) {
				foundBuffs += 2;
			} else if (buff.name.includes("Elixir")) {
				foundBuffs++;
			}
		}
		return foundBuffs;
	};

	const getPlayerRaidId = async (raidInfo) => {
		const targetUrl =
			"https://classic.warcraftlogs.com:443/v1/report/fights/" +
			raidInfo.reportID +
			"?api_key=0362a54ad91efa72541d961894d90ac5";
		const asyncResponse = await asyncRequest(targetUrl);
		var playerRaidId = 0;
		for (const friendly of asyncResponse.friendlies) {
			if (charName === friendly.name.toLowerCase()) {
				playerRaidId = friendly.id;
			}
		}
		return playerRaidId;
	};

	const asyncRequest = async (targetUrl) => {
		const response = await axios.get(targetUrl).then(async (response) => {
			return response.data;
		});
		return response;
	};

	const checkEnchants = (raidInfo) => {
		const enchantGear = [0, 2, 4, 6, 7, 8, 9, 14, 15];
		var enchanted = 0;
		enchantGear.forEach((element) => {
			if (raidInfo.gear[element]["permanentEnchant"]) {
				enchanted++;
			}
		});
		return enchanted;
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Container>
			<Paper>
				<h1>{charName.charAt(0).toUpperCase() + charName.slice(1)}</h1>
				{!loading ? "" : <h3>{pageStatus + runner}</h3>}
				{<RaidAccordion foundRaids={foundRaids} />}
			</Paper>
		</Container>
	);
}
