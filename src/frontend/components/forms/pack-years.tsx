import React, { useState } from 'react'

const PackYears: React.FC = () => {
    const [cigarsPerDay, setCigarsPerDay] = useState<number | ''>('')
    const [years, setYears] = useState<number | ''>('')

    const handleCigarsPerDayChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value
        if (value === '') {
            setCigarsPerDay('')
        } else {
            setCigarsPerDay(parseInt(value))
        }
    }

    const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '') {
            setYears('')
        } else {
            setYears(parseInt(value))
        }
    }

    const calculatePackYears = () => {
        if (cigarsPerDay && years) {
            return (cigarsPerDay * years) / 20
        } else {
            return ''
        }
    }

    return (
        <>
            <div className="textInputDiv">
                <p>Počet cigaret denně: </p>
                <input
                    type="number"
                    className="textInput"
                    onChange={handleCigarsPerDayChange}
                />
            </div>
            <div className="textInputDiv">
                <p>Jak dlouho (roky): </p>
                <input
                    type="number"
                    className="textInput"
                    onChange={handleYearsChange}
                />
            </div>
            <div className="textInputDiv">
                <p>Počet balíčko roků: </p>
                <input
                    type="text"
                    className="textInput"
                    disabled
                    value={calculatePackYears()}
                />
            </div>
        </>
    )
}

export default PackYears
