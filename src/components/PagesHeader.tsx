import { Box, Grid, TextField, Button, IconButton } from "@mui/material"
import IosShareIcon from "@mui/icons-material/IosShare"
import FilterListIcon from "@mui/icons-material/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import PageHeaderButton from "./PageHeaderButton"

const PagesHeader = () => {
  //   const navigate = useNavigate()
  //   const location = useLocation()
  //   const { keyword: urlKeyword } = useParams()
  //   const [keyword, setKeyword] = useState(urlKeyword || "");

  //   const searchHandler = () => {

  //     if(location.pathname.includes('program')&&keyword){
  //       navigate(`/admin/program/search/${keyword}`)
  //     }else if(location.pathname.includes('channel')&&keyword){
  //       navigate(`/admin/channel/search/${keyword}`)
  //     }else{
  //     navigate(`/admin/${location.pathname.split('/')[2]}` )
  //     }
  //   }

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
        <PageHeaderButton />
      </Grid>
    </Grid>
  )
}

export default PagesHeader
