import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    Tooltip,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import FolderIcon from '@mui/icons-material/Folder'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import PieChartIcon from '@mui/icons-material/PieChart';
import BackupIcon from '@mui/icons-material/Backup'
import RestoreIcon from '@mui/icons-material/Restore'
import ImportExport from '@mui/icons-material/ImportExport'
import { ImportContext } from './import-context'

// Define drawer widths for open and closed states
const drawerWidth = 240
const closedDrawerWidth = 60

// Custom styled drawer component
const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: open ? drawerWidth : closedDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
        width: open ? drawerWidth : closedDrawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        backgroundColor: '#ffffff', // Light background
        color: '#333333', // Dark text for contrast
        borderRight: '1px solid #e0e0e0', // Subtle border
    },
}))

interface MenuProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
    activeMenuButton?: Components
    setActiveMenuButton?: Dispatch<SetStateAction<Components>>
}

const Menu: React.FC<MenuProps> = ({
    setActiveComponent,
    activeMenuButton,
    setActiveMenuButton,
}) => {
    const [open, setOpen] = useState(true)

    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
        setActiveMenuButton(componentName)
    }

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const { setImported } = useContext(ImportContext)

    const handleImportButtonClick = async () => {
        await window.import.import()
        setImported(true)
    }

    const handleBackUpButtonClick = async () => {
        await window.backUp.backUp()
    }

    const [openLoadBackUpDialog, setOpenLoadBackUpDialog] =
        React.useState(false)

    const handleLoadBackUpConfirm = async () => {
        setOpenLoadBackUpDialog(false)
        await window.backUp.loadBackUp()
        window.location.reload()
    }

    // Define menu items with their icons and components
    const menuItems = [
        {
            name: 'Seznam pacientů',
            component: Components.patientsList,
            icon: <PeopleAltIcon />,
        },
        {
            name: 'Plánované kontroly',
            component: Components.plannedChecks,
            icon: <CalendarMonthIcon />,
        },
        {
            name: 'Přidat pacienta',
            component: Components.addPatient,
            icon: <PersonAddIcon />,
        },
        {
            name: 'Studie',
            component: Components.studiesList,
            icon: <FolderIcon />,
        },
        {
            name: 'Přidat studii',
            component: Components.addStudy,
            icon: <CreateNewFolderIcon />,
        },
        {
            name: 'Kaplan-Meier',
            component: Components.kaplanMeier,
            icon: <ShowChartIcon />,
        },
    ]

    return (
        <StyledDrawer variant="permanent" open={open}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    p: 1,
                    backgroundColor: '#f5f5f5', // Light gray header background
                }}
            >
                {open && (
                    <Box
                        component="img"
                        src="../img/LOGO_splt.png"
                        alt="Česká společnost otorinolaryngologie a chirurgie hlavy a krku"
                        sx={{ height: '80%', width: '100%' }}
                    />
                )}
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{ color: '#1976d2' }}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>

            <Divider sx={{ backgroundColor: '#e0e0e0' }} />

            <List>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.component}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <Tooltip
                            title={open ? '' : item.name}
                            placement="right"
                        >
                            <ListItemButton
                                onClick={() =>
                                    handleButtonClick(item.component)
                                }
                                selected={activeMenuButton === item.component}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    '&.Mui-selected': {
                                        backgroundColor: '#e3f2fd', // Light blue background for selected item
                                        color: '#1976d2', // Primary blue text for selected item
                                        '&:hover': {
                                            backgroundColor: '#bbdefb', // Slightly darker on hover
                                        },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5', // Light gray on hover
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color:
                                            activeMenuButton === item.component
                                                ? '#1976d2'
                                                : '#757575', // Blue if selected, gray otherwise
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.95rem',
                                            fontWeight:
                                                activeMenuButton ===
                                                item.component
                                                    ? 500
                                                    : 400, // Bold if selected
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ backgroundColor: '#e0e0e0' }} />

            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip
                        title={open ? '' : 'Deskriptivní statistika'}
                        placement="right"
                    >
                        <ListItemButton
                            onClick={() =>
                                handleButtonClick(Components.descriptiveStatistics)
                            }
                            selected={
                                activeMenuButton === Components.descriptiveStatistics
                            }
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                '&.Mui-selected': {
                                    backgroundColor: '#e3f2fd', // Light blue background for selected item
                                    color: '#1976d2', // Primary blue text for selected item
                                    '&:hover': {
                                        backgroundColor: '#bbdefb', // Slightly darker on hover
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: '#f5f5f5', // Light gray on hover
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color:
                                        activeMenuButton ===
                                        Components.descriptiveStatistics
                                            ? '#1976d2'
                                            : '#757575', // Blue if selected, gray otherwise
                                }}
                            >
                                <PieChartIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Deskriptivní statistika"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    '& .MuiListItemText-primary': {
                                        fontSize: '0.95rem',
                                        fontWeight:
                                            activeMenuButton ===
                                            Components.descriptiveStatistics
                                                ? 500
                                                : 400, // Bold if selected
                                    },
                                }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            </List>

            <Divider sx={{ backgroundColor: '#e0e0e0' }} />

            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip
                        title={open ? '' : 'Importovat data'}
                        placement="right"
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5', // Light gray on hover
                                },
                            }}
                            onClick={handleImportButtonClick}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#757575', // Gray for utility icons
                                }}
                            >
                                <ImportExport />
                            </ListItemIcon>
                            <ListItemText
                                primary="Importovat data"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    '& .MuiListItemText-primary': {
                                        fontSize: '0.95rem',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip
                        title={open ? '' : 'Zálohovat databázi'}
                        placement="right"
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5', // Light gray on hover
                                },
                            }}
                            onClick={handleBackUpButtonClick}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#757575', // Gray for utility icons
                                }}
                            >
                                <BackupIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Zálohovat databázi"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    '& .MuiListItemText-primary': {
                                        fontSize: '0.95rem',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip
                        title={open ? '' : 'Obnovit databázi'}
                        placement="right"
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5', // Light gray on hover
                                },
                            }}
                            onClick={() => setOpenLoadBackUpDialog(true)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#757575', // Gray for utility icons
                                }}
                            >
                                <RestoreIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Obnovit databázi"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    '& .MuiListItemText-primary': {
                                        fontSize: '0.95rem',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </Tooltip>
                    <Dialog open={openLoadBackUpDialog}>
                        <DialogTitle>Obnovení databáze</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Databáze bude obnovena ze zálohy. Tento proces
                                smaže veškerá data v databázi a nahradí je daty
                                ze zálohy. Opravdu chcete pokračovat?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleLoadBackUpConfirm}>
                                Rozumím
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
            </List>
        </StyledDrawer>
    )
}

export default Menu
