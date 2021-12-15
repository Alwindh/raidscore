import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";

export default function ButtonAppBar() {
	return (
		<Box style={{ marginBottom: "2em" }} sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link variant="h5" underline="none" color="#fff" component="button">
							Home
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
