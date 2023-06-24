import React, { useState } from "react";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Anchor,
  rem,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(100),
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(700),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

function RegisterPage() {
  const { classes } = useStyles();
  const [errorUsername, setErrorUsername] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async ({
    username,
    password,
    email,
    confirmPassword,
  }) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          confirmPassword: confirmPassword,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorUsername(data.messageUsername);
        setErrorPassword(data.messagePassword);
        setErrorEmail(data.messageEmail);
        console.log(
          data.messageUsername || data.messageEmail || data.messagePassword
        );
        return;
      }
      setErrorUsername(null);
      setErrorPassword(null);
      setErrorEmail(null);
      const data = await res.json();
      navigate("/home");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Chatopia!
        </Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            {...form.getInputProps("email")}
            error={errorEmail}
            required
            label="Email"
            placeholder="Your email"
            size="md"
          />
          <TextInput
            {...form.getInputProps("username")}
            error={errorUsername}
            required
            label="Username"
            placeholder="Your username"
            size="md"
            mt="md"
          />
          <PasswordInput
            {...form.getInputProps("password")}
            required
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <PasswordInput
            {...form.getInputProps("confirmPassword")}
            required
            label="Repeat password"
            error={errorPassword}
            placeholder="Repeat your password"
            mt="md"
            size="md"
          />
          <Button type="submit" fullWidth mt="xl" size="md">
            Register
          </Button>
          <Text ta="center" mt="md">
            <Anchor component={Link} to="/login" weight={700}>
              <IconArrowLeft size={rem(12)} stroke={1.5} /> Back to the login
              page
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
}

export default RegisterPage;
