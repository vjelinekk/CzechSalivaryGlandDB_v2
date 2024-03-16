import { expect, test } from '@jest/globals';
import isValidName from '../src/frontend/utils/isValidName';

const generateRandomString = () => {
    const characters = 'ÁBCČĎÉĚFGHIÍJKLMNŇÓPQRŘŠŤÚŮVWXYZ';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex] + Array.from({ length: 10 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

test.each(Array.from({ length: 10 }, () => [generateRandomString(), true]))('isCzechAlphabet(%s) returns %s', (input, expected) => {
    expect(isValidName(input)).toBe(expected);
});

test.each([
    [1, false],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [0, false],
    // Add more test cases for non-alphabet characters (like numbers)
])('isCzechAlphabet(%s) returns %s', (input, expected) => {
    expect(isValidName(input)).toBe(expected);
});
