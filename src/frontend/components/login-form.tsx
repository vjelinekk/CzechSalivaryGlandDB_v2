import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Alert,
    AlertTitle,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    List,
    ListItem,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface LoginFormProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn }) => {
    const [isPasswordSet, setIsPasswordSet] = useState<boolean>(false)
    const [isEncryptionEnabled, setIsEncryptionEnabled] = useState<
        boolean | null
    >(null)
    const [useEncryptionValue, setUseEncryptionValue] = useState<string>('ano')
    const [validationFailed, setValidationFailed] = useState<boolean>(false)
    const [generatedKey, setGeneratedKey] = useState<string>('')
    const [password, setPassword] = useState('')
    const [databaseKey, setDatabaseKey] = useState('')

    useEffect(() => {
        // Check if the password is set
        const checkIfPasswordIsSet = async () => {
            const passwordSet = await window.encryption.isPasswordSet()
            setIsPasswordSet(passwordSet)
        }

        // Generate a key for the database
        const generateKey = async () => {
            const key = await window.encryption.generateEncryptionKey()
            setGeneratedKey(key)
        }

        const getIsEncryptionEnabled = async () => {
            const encryptionEnabled =
                await window.encryption.isEncryptionEnabled()
            if (encryptionEnabled === false) {
                window.encryption.setEncryptionKey('')
                setIsLoggedIn(true)
            }
            setIsEncryptionEnabled(encryptionEnabled)
        }

        getIsEncryptionEnabled()
        checkIfPasswordIsSet()
        generateKey()
    }, [])

    useEffect(() => {
        // after 5 seconds, clear the validation failed state
        const timeout = setTimeout(() => {
            setValidationFailed(false)
        }, 5000)

        return () => clearTimeout(timeout)
    }, [validationFailed])

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Handle form submission here
        if (isPasswordSet) {
            const validation =
                await window.encryption.validatePassword(password)
            console.log(validation)
            if (!validation) {
                setValidationFailed(true)
                return
            }
            window.encryption.setEncryptionKey(databaseKey)
        } else {
            await window.encryption.insertPasswordRow(
                password,
                isEncryptionEnabled
            )
            window.encryption.setEncryptionKey(generatedKey)
        }
        setIsLoggedIn(true)
    }

    const handleUseEncryptionSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        // Handle form submission here
        if (useEncryptionValue === 'ano') {
            setIsEncryptionEnabled(true)
        } else {
            await window.encryption.insertUsingEncryption(false)
            window.encryption.setEncryptionKey('')
            setIsLoggedIn(true)
        }
    }

    return (
        <Dialog open={true}>
            {validationFailed && (
                <Alert severity="error">
                    <AlertTitle>Chyba</AlertTitle>
                    Špatné heslo
                </Alert>
            )}
            <DialogTitle>Přihlášení do databáze</DialogTitle>
            {isEncryptionEnabled === null ? (
                <DialogContent>
                    <Stack spacing={2}>
                        <Alert severity="info">
                            <AlertTitle>Zásady pro práci s databází</AlertTitle>
                            <List>
                                <ListItem>
                                    Pokud hodláte pracovat s reálnými daty
                                    pacientů je nutné zvolit zabezpečenou verzi
                                    databáze.
                                </ListItem>
                                <ListItem>
                                    Přidávání nově diagnostikovaných pacientů,
                                    musí probíhat v souladu s platnými zákony a
                                    na základě souhlasu pacienta.
                                </ListItem>
                                <ListItem>
                                    Při retrospektivním přidávání pacientů je
                                    nutné, aby byli jasně definované důvody proč
                                    jsou zvolené osobní údaje uloženy v
                                    databázi.
                                </ListItem>
                            </List>
                        </Alert>
                        <form onSubmit={handleUseEncryptionSubmit}>
                            <FormControl>
                                <FormLabel>
                                    Chcete používat zabezpečenou databázi?
                                </FormLabel>
                                <RadioGroup
                                    value={useEncryptionValue}
                                    onChange={(e) =>
                                        setUseEncryptionValue(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="ano"
                                        control={<Radio />}
                                        label="Ano"
                                    />
                                    {useEncryptionValue === 'ne' && (
                                        <Alert severity="warning">
                                            Pokud vyberete tuto možnost databáze
                                            nebude žádným způsobem zašifrována a
                                            osobní informace o pacientech budou
                                            dostupné pro každého, kdo má přístup
                                            k aplikaci.
                                        </Alert>
                                    )}
                                    <FormControlLabel
                                        value="ne"
                                        control={<Radio />}
                                        label="Ne"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Pokračovat
                            </Button>
                        </form>
                    </Stack>
                </DialogContent>
            ) : (
                <DialogContent>
                    <form onSubmit={handleLoginSubmit}>
                        <Stack spacing={2}>
                            {isPasswordSet ? (
                                <>
                                    <TextField
                                        type="password"
                                        label="Heslo"
                                        variant="filled"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <TextField
                                        type="password"
                                        label="Klíč k databázi"
                                        variant="filled"
                                        value={databaseKey}
                                        onChange={(e) =>
                                            setDatabaseKey(e.target.value)
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <Alert severity="info">
                                        <AlertTitle>Tvorba hesla</AlertTitle>
                                        Vytvořte heslo pro přístup k databázi
                                        toto heslo je nutné si zapamatovat,
                                        protože bez něj se do databáze
                                        nedostanete.
                                    </Alert>
                                    <TextField
                                        type="password"
                                        label="Nové heslo"
                                        variant="filled"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <Alert severity="info">
                                        <AlertTitle>
                                            Tvorba klíče k databázi
                                        </AlertTitle>
                                        Byl pro vás vygenerován klíč k databázi,
                                        který je nutné si bezpečně uložit,
                                        protože bez něj nebude možné zobrazit
                                        osobní informace o pacientech.
                                    </Alert>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{ width: '100%' }}
                                    >
                                        <TextField
                                            variant="filled"
                                            value={generatedKey}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                        />
                                        <IconButton
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    generatedKey
                                                )
                                            }}
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Stack>
                                </>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Přihlásit se
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default LoginForm
