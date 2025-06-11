import React, { useEffect, useState } from 'react';
import { ITTestData } from '../../../../types/statistics.types';
import { InferenceChiSquareCategories } from '../../../../enums/statistics.enums';
import CategoriesSelector from '../chi-square/categories-selector';
import TTestTailSelector from './t-test-tail-selector';
import TTestValueSelector from './t-test-value-selector';
import { TTestType, TTestValue } from '../../../../enums/statistics.enums';
import { Box, Typography } from '@mui/material';
import TTestValueCalculator from './t-test-value-calculator';

const TTest: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<
        Record<number, Record<InferenceChiSquareCategories, string[]>>
    >({});

    const [tTestData, setTTestData] = useState<ITTestData | null>(null);
    const [selectedTestType, setSelectedTestType] = useState<TTestType>(TTestType.TWO_TAILED);
    const [selectedValue, setSelectedValue] = useState<TTestValue>(TTestValue.AGE);

    useEffect(() => {
         const fetchTTestData = async () => {
            const response = await window.api.getTTestData(
                {
                    first: {
                        histologicalTypes: selectedCategories[0]?.histologicalTypes || [],
                        tClassification: selectedCategories[0]?.tClassification || [],
                        nClassification: selectedCategories[0]?.nClassification || [],
                        mClassification: selectedCategories[0]?.mClassification || [],
                        persistence: selectedCategories[0]?.persistence || [],
                        recurrence: selectedCategories[0]?.recurrence || [],
                        state: selectedCategories[0]?.state || []
                    },
                    second: {
                        histologicalTypes: selectedCategories[1]?.histologicalTypes || [],
                        tClassification: selectedCategories[1]?.tClassification || [],
                        nClassification: selectedCategories[1]?.nClassification || [],
                        mClassification: selectedCategories[1]?.mClassification || [],
                        persistence: selectedCategories[1]?.persistence || [],
                        recurrence: selectedCategories[1]?.recurrence || [],
                        state: selectedCategories[1]?.state || []
                    }
                }
            )

            if (response) {
                setTTestData(response);
                console.log('T-Test data fetched successfully:', response);
            } else {
                console.error('Failed to fetch T-Test data');
            }
        }

        if (Object.keys(selectedCategories).length === 2) {
            fetchTTestData();
        } else {
            setTTestData(null);
        }
        
    }, [selectedCategories])

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                T-Test test
            </Typography>

            <CategoriesSelector
                title="Vyberte skupiny pro T-Test"
                numberOfCategories={2}
                setSelectedCategories={setSelectedCategories}
                categoryPrefix="Skupina"
            />

            <TTestTailSelector 
                selectedTestType={selectedTestType} 
                setSelectedTestType={setSelectedTestType} 
            />

            <TTestValueSelector 
                selectedValue={selectedValue} 
                setSelectedValue={setSelectedValue}
            />

            {tTestData && (
                <TTestValueCalculator 
                    selectedTestType={selectedTestType} 
                    selectedValue={selectedValue} 
                    tTestData={tTestData} 
                />
            )}
        </Box>
    );
}

export default TTest;
