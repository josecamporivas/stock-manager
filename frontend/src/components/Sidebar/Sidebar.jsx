import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from '@mui/icons-material/Menu';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import SellIcon from '@mui/icons-material/Sell';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const OPTIONS_SIDEBAR = [
    {
        name: "Tu perfil",
        icon: <PersonIcon />,
        path: "/profile"
    },
    {
        name: "Página principal",
        icon: <HomeIcon />,
        path: "/dashboard"
    },
    {
        name: "Gestión usuarios",
        icon: <PeopleOutlineIcon />,
        path: "/users"
    },
    {
        name: "Gestión compras",
        icon: <ShoppingCartIcon />,
        path: "/buys"
    },
    {
        name: "Gestión productos",
        icon: <StoreIcon />,
        path: "/products"
    },
    {
        name: "Gestión ventas",
        icon: <SellIcon />,
        path: "/sales"
    }
]

export default function Sidebar() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        navigate('/login')
    }

    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" >
        <List>
            {OPTIONS_SIDEBAR.map((option) => (
                <ListItem disablePadding key={option.name}>
                    <ListItemButton onClick={() => navigate(option.path)}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText primary={option.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
      </Box>
    );
  
    return (
        <>
            <Drawer open={open} onClose={toggleDrawer(false)} >
                {DrawerList}
                <ListItem>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                </ListItem>
            </Drawer>
            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
        </>
    );
}