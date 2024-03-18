# PDF Receipt Generator [![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-donate-yellow.svg)](https://www.buymeacoffee.com/galmitrani1)

## Introduction

The PDF Receipt Generator is a simple web application designed to streamline the creation of transactional receipts in PDF format in the client side.
This utility is especially useful for businesses and individuals looking to generate professional receipts with customizable images and font styles.

## Features

- **Dynamic PDF Creation**: Users can fill out a form to automatically generate a detailed receipt.
- **Custom Header and Footer Images**: Supports uploading custom images to be used at the top and bottom of the receipt.
- **Flexible Font Integration**: By adding a font file to the assets directory, users can personalize the receipt's typography.

## File Upload Guide

The application supports the following upload types with corresponding recommendations for optimal display:

- **Event Header Image**:
  - File Types: `.png`, `.jpeg`
  - Recommended Dimensions: Width should be greater than height.
  - Placement: Appears at the top of the receipt.

- **Event Footer Image**:
  - File Types: `.png`, `.jpeg`
  - Suggested Dimensions: Should be proportional to allow for a balanced layout.
  - Placement: Appears at the bottom of the receipt.

Images that do not conform to these guidelines may not display as intended.

## Custom Fonts

To customize the receipt font, follow these steps:

1. Obtain a TrueType font (`.ttf`) file. Ensure you have the appropriate license to use the font.
2. Place the `.ttf` file into the `assets` folder within the project directory.
3. The application will detect the new font and apply it to the next PDF generated.

Note: The font change will affect the entire document, including headers, body text, and footers.

## How to Use

1. Open the web application and fill in the form with the relevant transaction, client, and event details.
2. Upload your header and footer images using the designated fields.
3. Click the "Generate PDF" button to produce your customized receipt, which you can then download and distribute as required.

## Local Development

To set up the project for local development:

1. Clone the repository to your local machine.
2. Ensure you have [Node.js](https://nodejs.org/) installed.
3. Install the project dependencies with `npm install`.
4. Run the application using `npm start` or your preferred method.
5. Navigate to the local server address provided in your terminal.

## Contribution

Contributions to the PDF Receipt Generator are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Acknowledgments

- Special thanks to all contributors who have invested time in improving this tool.
- Appreciation for open-source projects that have provided the foundational technologies used in this application.

---

Thank you for considering the PDF Receipt Generator for your transactional document needs. This README provides a general overview of the project. For additional details, please refer to the source code and inline documentation.
