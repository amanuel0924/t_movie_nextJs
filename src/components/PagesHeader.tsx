import { Box, Grid, TextField, Button, IconButton } from "@mui/material"
import IosShareIcon from "@mui/icons-material/IosShare"
import FilterListIcon from "@mui/icons-material/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import PageHeaderButton from "./PageHeaderButton"
import { options } from "@/app/api/auth/[...nextauth]/options"

import { defineAbilitiesFor } from "@/db/reactCasl"
import { getServerSession } from "next-auth"

const PagesHeader = async () => {
  const session = await getServerSession(options)
  // const abilities = await defineAbilitiesForReact(
  //   session?.user.roleId as number
  // )
  console.log("fromHeader", session)
  const abilities = await defineAbilitiesFor(session?.user.roleId as number)

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={7}>
        <Box
          sx={{
            bgcolor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <IconButton
            // onClick={searchHandler}
            sx={{ color: "#181A41" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
              width: "100%",
            }}
            id="outlined-basic"
            placeholder="Search"
            variant="outlined"
            size="small"
            // value={keyword}
            // onChange={(e) => setKeyword(e.target.value)}
          />
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Button
          size="small"
          sx={{ color: "#181A41" }}
          variant="text"
          startIcon={<IosShareIcon />}
        >
          Export
        </Button>

        <Button
          size="small"
          sx={{ color: "#181A41" }}
          variant="text"
          startIcon={<FilterListIcon />}
        >
          Add Filter
        </Button>

        {abilities?.can("create", "Movie") && <PageHeaderButton />}
      </Grid>
    </Grid>
  )
}

export default PagesHeader
