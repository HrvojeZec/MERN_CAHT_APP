import React from "react";
import {
  createStyles,
  Navbar,
  Text,
  Group,
  rem,
  Avatar,
  Space,
} from "@mantine/core";
import { useUserdata } from "../../stores/PersonContxt";
import { useUsersdata } from "../../stores/GetAllUsers";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.ld,

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },
  avatar: {
    marginTop: theme.spacing.md,
  },
  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  profileInfo: {
    display: "flex",
    flexDirection: "column",
  },

  profileName: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 500,
    margin: 0,
  },

  profileEmail: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    color: theme.colors.gray[5],
    margin: 0,
  },
  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export function Sidebar(props) {
  const { classes } = useStyles();
  const { user: currentUser } = useUserdata();
  const { data: users } = useUsersdata();

  console.log(users.users);

  const submitHandler = (userID) => {
    console.log(userID);

    props.onUserClicked(userID);
  };

  const collectionLinks = users.users.map((user) => {
    if (user.id !== currentUser._id) {
      return (
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            submitHandler(user.id);
          }}
          key={user.id}
          className={classes.collectionLink}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: rem(10),
          }}
        >
          <Avatar radius="xl" style={{ marginRight: rem(9), flexShrink: 0 }} />
          <span style={{ fontSize: rem(16) }}>{user.username}</span>
        </a>
      );
    } else {
      return null;
    }
  });

  return (
    <Navbar height={400} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section
        style={{ marginBottom: "16px" }}
        className={classes.section}
      >
        <div style={{ marginBottom: "16px" }} className={classes.profile}>
          <Avatar radius="xl" />
          <div className={classes.profileInfo}>
            <h1 className={classes.profileName}>{currentUser.username}</h1>
            <p className={classes.profileEmail}>{currentUser.email}</p>
          </div>
        </div>
      </Navbar.Section>
      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="sm" weight={500} color="dimmed">
            Collections
          </Text>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
      </Navbar.Section>
    </Navbar>
  );
}
