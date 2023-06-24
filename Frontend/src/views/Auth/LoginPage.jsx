import React, { useState } from "react";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../routing/configureAuth";

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

function LoginPage() {
  const { classes } = useStyles();
  const [errorUsername, setErrorUsername] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async ({ username, password }) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorUsername(data.messageUsername);
        setErrorPassword(data.messagePassword);
        console.log(data.messageUsername || data.messagePassword);
        return;
      }
      setErrorUsername(null);
      setErrorPassword(null);
      const data = await res.json();
      dispatch(authActions.login());
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
            {...form.getInputProps("username")}
            error={errorUsername}
            required
            label="Username"
            placeholder="Your username"
            size="md"
          />
          <PasswordInput
            {...form.getInputProps("password")}
            required
            label="Password"
            error={errorPassword}
            placeholder="Your password"
            mt="md"
            size="md"
          />

          <Button type="submit" fullWidth mt="xl" size="md">
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor component={Link} to="/register" weight={700}>
              Register
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
}

export default LoginPage;
