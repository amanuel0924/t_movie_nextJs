"use client"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginSchema } from "@/schema"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login_form() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (result?.error) {
      console.error(result.error, "Failed to sign in")
      return
    } else {
      router.push("/admin")
    }
  }

  return (
    <Stack
      spacing={4}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={"h2"}>Login</Typography>

        <Box sx={{ width: "full" }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            margin="normal"
            fullWidth
            {...register("password")}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </form>
    </Stack>
  )
}
