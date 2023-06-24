import { createStyles, rem, Input, Flex, Button, Group } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../routing/configureAuth";
const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: rem(56),
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 999,
  },

  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export function HeaderSearch() {
  const { classes } = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const response = fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        const data = res.json();
        console.log(data);
      })
      .catch((error) => console.log(error));
    if (response) {
      dispatch(authActions.logout());
      navigate("/login");
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(`Searching for "${searchQuery}"...`);
  };
  return (
    <Group className={classes.header}>
      <div className={classes.searchWrapper}>
        <Flex gap="sm" align="center">
          {/*   <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            radius="xl"
            style={{ backgroundColor: "white", width: "300px" }}
          />
          <Button
            onClick={handleSearchClick}
            size="xs"
            radius="xl"
            color="blue"
          >
            Search
          </Button> */}
        </Flex>
      </div>
      <div>
        <Button
          size="xs"
          onClick={handleLogout}
          color="blue"
          style={{ marginLeft: "auto" }}
        >
          Log out
        </Button>
      </div>
    </Group>
  );
}
