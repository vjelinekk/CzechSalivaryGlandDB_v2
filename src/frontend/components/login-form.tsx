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
import { useTranslation } from 'react-i18next'

interface LoginFormProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn }) => {
    const { t } = useTranslation() // Hook pro překlady
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
                    <AlertTitle>{t('error')}</AlertTitle>
                    {t('wrong-password')}
                </Alert>
            )}
            <DialogTitle>{t('login-title')}</DialogTitle>
            {isEncryptionEnabled === null ? (
                <DialogContent>
                    <Stack spacing={2}>
                        <Alert severity="info">
                            <AlertTitle>{t('database-policies')}</AlertTitle>
                            <List>
                                <ListItem>
                                    {t('database-policy-1')}
                                </ListItem>
                                <ListItem>
                                    {t('database-policy-2')}
                                </ListItem>
                                <ListItem>
                                    {t('database-policy-3')}
                                </ListItem>
                            </List>
                        </Alert>
                        <form onSubmit={handleUseEncryptionSubmit}>
                            <FormControl>
                                <FormLabel>{t('use-secure-db')}</FormLabel>
                                <RadioGroup
                                    value={useEncryptionValue}
                                    onChange={(e) =>
                                        setUseEncryptionValue(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="ano"
                                        control={<Radio />}
                                        label={t('yes')}
                                    />
                                    {useEncryptionValue === 'ne' && (
                                        <Alert severity="warning">
                                            {t('warning-secure-db')}
                                        </Alert>
                                    )}
                                    <FormControlLabel
                                        value="ne"
                                        control={<Radio />}
                                        label={t('no')}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                {t('continue')}
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
                                        label={t('password')}
                                        variant="filled"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <TextField
                                        type="password"
                                        label={t('database-key')}
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
                                        <AlertTitle>{t('create-password')}</AlertTitle>
                                        {t('password-info')}
                                    </Alert>
                                    <TextField
                                        type="password"
                                        label={t('new-password')}
                                        variant="filled"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <Alert severity="info">
                                        <AlertTitle>{t('create-db-key')}</AlertTitle>
                                        {t('db-key-info')}
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
                                {t('login')}
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default LoginForm
