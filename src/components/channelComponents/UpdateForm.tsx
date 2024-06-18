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

import { useContext } from "react"
import { ModalContext } from "@/components/channelComponents/ModalContext"
import type { Channel } from "@prisma/client"
import { updateData } from "@/actions/channelActions"

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

const UpdateForm = () => {
  const { isUpdateModalOpen, closeModalUpdate, channel } =
    useContext(ModalContext)

  const channelData: Channel = channel as Channel

  const [formState, action] = useFormState(
    updateData.bind(null, channelData.id),
    {
      errors: {},
    }
  )

  const handleClose = () => {
    closeModalUpdate()
  }

  return (
    <Modal
      open={isUpdateModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
                label="name"
                variant={"filled"}
                size={"small"}
                name="name"
                defaultValue={channelData.name}
                error={!!formState.errors.name}
                helperText={formState.errors.name?.join(", ")}
              />
            </Stack>
          </Box>
          {!!formState.errors._form && (
            <FormHelperText sx={{ color: "red" }}>
              {formState.errors._form.join(", ")}
            </FormHelperText>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
            <Button onClick={handleClose} variant={"outlined"}>
              Cancel
            </Button>

            <Button
              sx={{ color: "white", bgcolor: "#181A41" }}
              variant={"contained"}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  )
}

export default UpdateForm
