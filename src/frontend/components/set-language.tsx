import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function LanguageSelector() {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={5}
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <img
                    src="../img/cs.svg"
                    alt="Czech"
                    style={{
                        width: 160,
                        height: 100,
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.5s ease',
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={() => changeLanguage('cs')}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.1)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.0)')
                    }
                />
            </Grid>
            <Grid item>
                <img
                    src="../img/sk.png"
                    alt="Slovak"
                    style={{
                        width: 160,
                        height: 100,
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.5s ease',
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={() => changeLanguage('sk')}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.1)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.0)')
                    }
                />
            </Grid>
            <Grid item>
                <img
                    src="../img/en.png"
                    alt="English"
                    style={{
                        width: 160,
                        height: 100,
                        borderRadius: '5px',
                        cursor: 'pointer',

                        transition: 'all 0.5s ease',
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={() => changeLanguage('en')}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.1)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.0)')
                    }
                />
            </Grid>
        </Grid>
    )
}
