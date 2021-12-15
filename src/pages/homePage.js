import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.changeValue = this.changeValue.bind(this);
		this.linkThrough = this.linkThrough.bind(this);
		this.state = { charName: null };
	}

	componentDidMount() {}

	changeValue(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	linkThrough() {
		if (this.state.charName !== null) {
			window.location = "/char/" + this.state.charName;
		}
	}

	render() {
		return (
			<Container>
				<Paper>
					<Stack>
						<FormControl>
							<TextField
								onChange={this.changeValue}
								id="outlined-basic"
								label="Character name"
								variant="outlined"
								name="charName"
							/>
							<br />
							<Button variant="outlined" onClick={this.linkThrough}>
								Check raidscore
							</Button>
						</FormControl>
					</Stack>
				</Paper>
			</Container>
		);
	}
}
