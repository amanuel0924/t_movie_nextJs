"use client"
import { useFormState } from "react-dom"
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
  FormHelperText,
} from "@mui/material"
import { createData } from "@/actions/userActions"
import { useSession } from "next-auth/react"
import type { Permission } from "@prisma/client"
import * as React from "react"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import ListItemText from "@mui/material/ListItemText"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import { AppAbility, defineAbilitiesFor } from "@/db/reactCasl"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
]

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 2,
}

const RoleForm = ({
  permission,
}: // ablity,
{
  permission: Permission[]
  // ablity: AppAbility
}) => {
  //   const { isModalOpen, closeModal } = useContext(ModalContext)
  const { data: session, status } = useSession()
  const [permissions, setPermissions] = React.useState<string[]>([])
  const [formState, action] = useFormState(createData, {
    errors: {},
  })
  const handleChange = (event: SelectChangeEvent<typeof permissions>) => {
    const {
      target: { value },
    } = event
    setPermissions(typeof value === "string" ? value.split(",") : value)
  }

  // console.log(ablity)

  return (
    // <Modal
    //   open={isModalOpen}
    //   onClose={closeModal}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    <form action={action}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Stack spacing={2} direction="column">
            <TextField
              sx={{ marginTop: 2 }}
              label="Name"
              variant={"filled"}
              size={"small"}
              name="name"
              error={!!formState.errors.name}
              helperText={formState.errors.name?.join(", ")}
            />

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={permissions}
                name="permission"
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {permission?.map((per) => (
                  <MenuItem key={per.id} value={per.id.toString()}>
                    <Checkbox
                      checked={permissions.indexOf(per.id.toString()) > -1}
                    />
                    <ListItemText primary={per.name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "red" }}>
                {formState.errors.permission?.join(",")}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Box>
        {!!formState.errors._form && (
          <FormHelperText sx={{ color: "red" }}>
            {formState.errors._form.join(", ")}
          </FormHelperText>
        )}
        {/* )} */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            padding: "20px",
          }}
        >
          {/* <Button onClick={closeModal} variant={"outlined"}>
            Cancel
          </Button> */}

          <Button
            sx={{ color: "white", bgcolor: "#181A41" }}
            variant={"contained"}
            type="submit"
          >
            Create
          </Button>
        </Box>
      </Box>
    </form>
    // </Modal>
  )
}

export default RoleForm
