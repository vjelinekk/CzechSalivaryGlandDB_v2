const React = require('react')

// Mock all the components from @react-pdf/renderer
const Document = ({ children }) =>
    React.createElement('div', { 'data-testid': 'pdf-document' }, children)
const Page = ({ children }) =>
    React.createElement('div', { 'data-testid': 'pdf-page' }, children)
const Text = ({ children, style }) =>
    React.createElement('span', { 'data-testid': 'pdf-text', style }, children)
const View = ({ children, style }) =>
    React.createElement('div', { 'data-testid': 'pdf-view', style }, children)

const StyleSheet = {
    create: (styles) => styles,
}

const Font = {
    register: () => {},
}

const PDFDownloadLink = ({ children, document, fileName, style }) => {
    return React.createElement(
        'div',
        {
            'data-testid': 'pdf-download-link',
            'data-filename': fileName,
            style,
        },
        children
    )
}

module.exports = {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    PDFDownloadLink,
}
