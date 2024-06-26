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
import Select from "@mui/material/Select"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useContext } from "react"
import { ModalContext } from "@/components/programComponents/ModalContext"
import type { Channel, Category, Type } from "@prisma/client"
import { createData } from "@/actions/programActions"
import { useSession } from "next-auth/react"

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

interface ProgramFormProps {
  channels: Channel[]
  categorys: Category[]
  types: Type[]
}

const ProgramForm = ({ channels, categorys, types }: ProgramFormProps) => {
  const { isModalOpen, closeModal } = useContext(ModalContext)
  const { data: session, status } = useSession()
  const [formState, action] = useFormState(
    createData.bind(
      null,
      session?.user?.roleId as number,
      session?.user?.id as string
    ),
    { errors: {} }
  )

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
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
                label="Video URL"
                variant={"filled"}
                size={"small"}
                name="videoUrl"
                error={!!formState.errors.videoUrl}
                helperText={formState.errors.videoUrl?.join(", ")}
              />
              <TextField
                sx={{ marginTop: 2 }}
                label="Description"
                variant={"filled"}
                size={"small"}
                name="description"
                error={!!formState.errors.description}
                helperText={formState.errors.description?.join(", ")}
              />
              <TextField
                sx={{ marginTop: 2 }}
                type="number"
                label="Duration"
                variant={"filled"}
                size={"small"}
                name="duration"
                error={!!formState.errors.duration}
                helperText={formState.errors.duration?.join(", ")}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label-chnnel">
                  Channel
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small-chneel"
                  label=" Channel"
                  name="channel"
                  defaultValue=""
                  error={!!formState.errors.channel}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {channels?.map((channel) => (
                    <MenuItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "red" }}>
                  {formState.errors.channel?.join(",")}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack spacing={2} direction="column">
              <TextField
                sx={{ marginTop: 2 }}
                label="Title"
                variant={"filled"}
                size={"small"}
                name="title"
                defaultValue=""
                error={!!formState.errors.title}
                helperText={formState.errors.title?.join(", ")}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label-chnnel-Category">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-select-small-label-Category"
                  id="demo-select-small-chneel-Category"
                  label=" Category"
                  name="category"
                  defaultValue=""
                  error={!!formState.errors.category}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categorys?.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "red" }}>
                  {formState.errors.category?.join(",")}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label-chnnel-type">
                  Type
                </InputLabel>
                <Select
                  labelId="demo-select-small-label-type"
                  id="demo-select-small-chneel-type"
                  label=" Type"
                  name="type"
                  defaultValue=""
                  error={!!formState.errors.type}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {types?.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "red" }}>
                  {formState.errors.type?.join(",")}
                </FormHelperText>
              </FormControl>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker name="released" />
                  </DemoContainer>
                </LocalizationProvider>
                {!!formState.errors.released && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formState.errors.released.join(", ")}
                  </FormHelperText>
                )}
              </Box>
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
            <Button onClick={closeModal} variant={"outlined"}>
              Cancel
            </Button>

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
    </Modal>
  )
}

export default ProgramForm
