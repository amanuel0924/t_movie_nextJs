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
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import { createData } from "@/actions/userActions"
import { useSession } from "next-auth/react"
import Select from "@mui/material/Select"
import type { Permission } from "@prisma/client"

const style = {
  position: "absolute",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 2,
}

const RoleForm = ({ permission }: { permission: Permission[] }) => {
  //   const { isModalOpen, closeModal } = useContext(ModalContext)
  const { data: session, status } = useSession()
  const [formState, action] = useFormState(createData, { errors: {} })

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

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label-chnnel-type">
                Permition
              </InputLabel>
              <Select
                labelId="demo-select-small-label-type"
                id="demo-select-small-chneel-type"
                label=" Permition"
                name="permission"
                defaultValue=""
                error={!!formState.errors.permission}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {permission?.map((per) => (
                  <MenuItem key={per.id} value={per.id}>
                    {per.id}
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
