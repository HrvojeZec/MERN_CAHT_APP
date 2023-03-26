import React from "react";
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Text,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { MessageCircle } from "tabler-icons-react";
import { BrandSnapchat } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.colors.dark[6],
    color: theme.colors.gray[0],
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.xl}px ${theme.spacing.lg}px`,
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Group>
        <BrandSnapchat
          size={48}
          style={{ marginLeft: 16 }}
          strokeWidth={2}
          color={"#40bf47"}
        />
        <Text>Chatopia</Text>
      </Group>
      <Container className={classes.inner}>
        <Group
          spacing={3}
          className={classes.links}
          noWrap
          position="center"
          style={{ pointerEvents: "none" }}
        >
          <ActionIcon size="lg">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
      <ActionIcon size="xl" radius="xl" style={{ pointerEvents: "none" }}>
        <MessageCircle
          position="right"
          size={35}
          strokeWidth={2}
          color={"#40bf47"}
          style={{ marginRight: 16 }}
        />
      </ActionIcon>
    </div>
  );
}
