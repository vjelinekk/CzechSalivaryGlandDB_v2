import React, { useState } from 'react';
import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModelTrainingTab from './model-training-tab';
import ModelInfoTab from './model-info-tab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`ml-tabpanel-${index}`}
            aria-labelledby={`ml-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const MlRiskScoring: React.FC = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth={false} sx={{ mt: 2, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    {t('Predikce rizik pomocí strojového učení')}
                </Typography>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="ml tabs">
                        <Tab label={t('Trénování modelu')} />
                        <Tab label={t('Informace o modelech')} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <ModelTrainingTab />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ModelInfoTab />
                </TabPanel>
            </Paper>
        </Container>
    );
};

export default MlRiskScoring;
