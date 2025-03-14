# Power Apps Dependency Visualizer

A powerful web-based tool that visualizes control dependencies in Power Apps canvas applications, enabling developers to understand complex relationships between controls and screens.

<div align="center">
<img src="https://github.com/DEmodoriGatsuO/power-apps-dependency-visualizer/blob/main/screenshots/main-view.png" alt="Power Apps Dependency Visualizer" width="800"/>
</div>

*Created by Claude (Anthropic)*

## Features

- **Dependency Graph Visualization**: Interactive visualization of control relationships with a force-directed layout
- **Hierarchical Structure Display**: Clearly see the parent-child relationships between controls
- **Property-Based Dependencies**: Identify dependencies based on property references in formulas
- **Interactive Explorer**: Zoom, pan, and interact with the visualization to focus on specific areas
- **Search and Filter**: Quickly find specific controls in large applications
- **Detailed Analysis**: Examine both incoming and outgoing dependencies for any control
- **Multilingual Support**: Interface available in both English and Japanese
- **No Server Required**: Runs entirely in the browser, with no server-side processing

## Use Cases

- **Application Structure Analysis**: Understand complex Power Apps at a glance
- **Impact Analysis**: Identify which controls might be affected by a change
- **Debugging**: Find dependency issues that might be causing application problems
- **Documentation**: Generate visual documentation of your Power Apps structure
- **Knowledge Transfer**: Help new team members understand the application's design

## How to Use

1. **Input YAML Source Code**:
   - Paste your Power Apps YAML source code into the input box
   - Or use the sample data to try out the tool

2. **Analyze Dependencies**:
   - Click "Analyze Dependencies" to process the YAML code
   - The tool will extract and analyze control relationships

3. **Explore the Visualization**:
   - Switch between Graph and Table views
   - Hover over nodes to see details
   - Use zoom controls to focus on specific areas
   - Search for specific controls in the table view

## Getting Started

### Method 1: Direct Web Access

Simply visit [Power Apps Dependency Visualizer](https://demodorigatsuo.github.io/power-apps-dependency-visualizer/) to use the tool online.

### Method 2: Local Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/DEmodoriGatsuO/power-apps-dependency-visualizer.git
   ```

2. Open `index.html` in your web browser

3. No server setup or installation required!

### Method 3: GitHub Pages

1. Fork this repository
2. Go to Settings > Pages
3. Set source to your main branch
4. Your visualizer will be available at `https://[your-username].github.io/power-apps-dependency-visualizer/`

## Extracting YAML from Power Apps

To extract the YAML source code from your Power Apps:

1. Open your Power Apps in edit mode
2. Go to File > Save as
3. Choose "This computer" as the destination
4. Save the .msapp file
5. Rename the .msapp file to .zip
6. Extract the .zip file
7. Look for YAML files in the extracted content

## Technical Details

The Power Apps Dependency Visualizer uses:

- **D3.js**: For interactive force-directed graph visualization
- **js-yaml**: For parsing YAML source code
- **HTML5/CSS3/JavaScript**: For the user interface and application logic

All processing happens client-side, ensuring your Power Apps code remains private and secure.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Created by Claude (Anthropic)
- Inspired by the need for better Power Apps visualization tools
- Thanks to the Power Apps and Power Platform community

---

*Disclaimer: This is not an official Microsoft tool. Power Apps is a trademark of Microsoft Corporation.*