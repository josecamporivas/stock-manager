import { useEffect, useState } from "react";
import { getUnreadNotifications, markNotificationAsRead } from "../../utils/queries/notifications";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge, Box, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function NotificationButton() {
    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    const toggleDrawer = (open) => () => {
        setOpen(open)
    }

    const fetchNotifications = async () => {
        const dataNotifications = await getUnreadNotifications()

        if(dataNotifications.error){
            console.log(dataNotifications.error)
        } else {
            setNotifications(dataNotifications)
        }
    }

    const handleNotificationClick = (notificationId) => async () => {
        const result = await markNotificationAsRead(notificationId)

        if(result.error){
            console.log(result.error)
        }

        const notificationIndex = notifications.findIndex(notification => notification.notification_id === notificationId)

        setNotifications([
            ...notifications.slice(0, notificationIndex),
            ...notifications.slice(notificationIndex + 1, notifications.length)
        ])
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification.notification_id}>
                <ListItemText primary={notification.message}
                    primaryTypographyProps={{fontSize: '14px !important'}}
                />
                <Button variant="text" color="primary" onClick={handleNotificationClick(notification.notification_id)}>
                    <CheckIcon />
                </Button>
              </ListItem>
            ))}

            {notifications.length === 0 &&
                <ListItem>
                    <ListItemText primary="No hay notificaciones" />
                </ListItem>}
            </List>
        </Box>
    );

    return (
        <div>
            <Button sx={{position: 'absolute', top: '20px', right: '30px', bgcolor: '#1976d222'}}
                    variant="text"
                    onClick={toggleDrawer(true)}>
                <Badge
                    badgeContent={notifications.length}
                    color="warning"
                >
                    <NotificationsNoneIcon />
                </Badge>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
                {DrawerList}
            </Drawer>
        </div>
    )
}