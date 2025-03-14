/**
 * Power Apps Dependency Visualizer
 * JavaScript for analyzing and visualizing Power Apps YAML control dependencies
 * Created by Claude (Anthropic)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Language settings
    const languages = {
        'en': {
            appTitle: 'Power Apps Dependency Visualizer',
            appSubtitle: 'Tool for visualizing control dependencies from YAML source code',
            yamlCodeLabel: 'YAML Source Code',
            loadSample: 'Load Sample',
            analyze: 'Analyze Dependencies',
            clear: 'Clear',
            errorPrefix: 'Error: ',
            emptyYamlError: 'Please enter YAML code.',
            parsingError: 'Failed to parse YAML. Please check the Power Apps YAML format.',
            rootControlError: 'No root controls found. Please check the YAML structure.',
            analysisError: 'Dependency analysis failed: ',
            successMessage: 'Analysis complete. View the visualization results below.',
            visualization: 'Dependency Visualization',
            graphTab: 'Graph View',
            tableTab: 'Table View',
            search: 'Search by control name...',
            controlTypes: 'Control Types',
            loadingMessage: 'Analyzing...',
            footer: 'Power Apps Dependency Visualizer v1.0 | Created by Claude (Anthropic)',
            // Table headers
            thControlName: 'Control Name',
            thType: 'Type',
            thParent: 'Parent Control',
            thDependsOn: 'Depends On',
            thDependedBy: 'Depended By',
            noControls: 'No controls found.',
            // Tooltips
            ttDependency: 'Dependency',
            ttSource: 'Source',
            ttTarget: 'Target',
            ttType: 'Type',
            ttControlType: 'Type',
            ttIncomingDeps: 'Incoming Dependencies',
            ttOutgoingDeps: 'Outgoing Dependencies',
            ttParent: 'Parent',
            // Dependency types
            dtParentChild: 'Parent-Child',
            dtDataBinding: 'Data Binding',
            dtPropertyRef: 'Property Reference',
            // Control types
            ctScreen: 'Screen',
            ctForm: 'Form',
            ctDataCard: 'DataCard',
            ctTextLabel: 'Text/Label',
            ctTextInput: 'TextInput',
            ctComboBox: 'ComboBox',
            ctDropDown: 'DropDown',
            ctDatePicker: 'DatePicker',
            ctButton: 'Button',
            ctGallery: 'Gallery',
            ctImage: 'Image',
            // Zoom controls
            zoomIn: 'Zoom In',
            zoomOut: 'Zoom Out',
            resetView: 'Reset View'
        },
        'ja': {
            appTitle: 'Power Apps 依存関係ビジュアライザー',
            appSubtitle: 'YAMLソースコードからコントロール間の依存関係を視覚化するツール',
            yamlCodeLabel: 'YAMLソースコード',
            loadSample: 'サンプルを読み込む',
            analyze: '依存関係を解析',
            clear: 'クリア',
            errorPrefix: 'エラー: ',
            emptyYamlError: 'YAMLコードを入力してください。',
            parsingError: 'YAMLの解析に失敗しました。Power AppsのYAMLフォーマットを確認してください。',
            rootControlError: 'ルートコントロールが見つかりません。YAMLの構造を確認してください。',
            analysisError: '依存関係の解析に失敗しました: ',
            successMessage: '解析が完了しました。下部の可視化結果をご確認ください。',
            visualization: '依存関係の可視化',
            graphTab: 'グラフ図',
            tableTab: 'テーブル表示',
            search: 'コントロール名で検索...',
            controlTypes: 'コントロールタイプ',
            loadingMessage: '解析中...',
            footer: 'Power Apps 依存関係ビジュアライザー v1.0 | Created by Claude (Anthropic)',
            // Table headers
            thControlName: 'コントロール名',
            thType: 'タイプ',
            thParent: '親コントロール',
            thDependsOn: '依存するコントロール',
            thDependedBy: '依存されるコントロール',
            noControls: 'コントロールが見つかりません。',
            // Tooltips
            ttDependency: '依存関係',
            ttSource: '元',
            ttTarget: '先',
            ttType: '種類',
            ttControlType: 'タイプ',
            ttIncomingDeps: '入力依存',
            ttOutgoingDeps: '出力依存',
            ttParent: '親',
            // Dependency types
            dtParentChild: '親子関係',
            dtDataBinding: 'データバインド',
            dtPropertyRef: 'プロパティ参照',
            // Control types
            ctScreen: 'スクリーン',
            ctForm: 'フォーム',
            ctDataCard: 'データカード',
            ctTextLabel: 'テキスト/ラベル',
            ctTextInput: 'テキスト入力',
            ctComboBox: 'コンボボックス',
            ctDropDown: 'ドロップダウン',
            ctDatePicker: '日付選択',
            ctButton: 'ボタン',
            ctGallery: 'ギャラリー',
            ctImage: '画像',
            // Zoom controls
            zoomIn: 'ズームイン',
            zoomOut: 'ズームアウト',
            resetView: '表示をリセット'
        }
    };

    // Set default language from browser or localStorage
    let currentLang = localStorage.getItem('powerAppsVisualizerLang') || 
                    (navigator.language && navigator.language.startsWith('ja') ? 'ja' : 'en');
    
    // DOM Elements
    const langSelector = document.getElementById('language-selector');
    const appTitle = document.getElementById('app-title');
    const appSubtitle = document.getElementById('app-subtitle');
    const yamlCodeLabel = document.getElementById('yaml-code-label');
    const yamlInput = document.getElementById('yaml-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const loadSampleBtn = document.getElementById('load-sample');
    const resultSection = document.getElementById('result-section');
    const loader = document.getElementById('loader');
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');
    const successAlert = document.getElementById('success-alert');
    const successMessage = document.getElementById('success-message');
    const visualizationTitle = document.getElementById('visualization-title');
    const tabs = document.querySelectorAll('.tab');
    const graphTabBtn = document.getElementById('graph-tab-btn');
    const tableTabBtn = document.getElementById('table-tab-btn');
    const tableSearch = document.getElementById('table-search');
    const graphContainer = document.getElementById('graph-container');
    const dependencyTable = document.getElementById('dependency-table');
    const tableHeaders = dependencyTable.querySelectorAll('th');
    const legendTitle = document.getElementById('legend-title');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetViewBtn = document.getElementById('reset-view');
    const loaderText = document.getElementById('loader-text');
    const footerText = document.getElementById('footer-text');

    // Initialize language selector
    if (langSelector) {
        langSelector.value = currentLang;
        langSelector.addEventListener('change', function() {
            currentLang = this.value;
            localStorage.setItem('powerAppsVisualizerLang', currentLang);
            updateUILanguage();
        });
    }

    // Update UI with selected language
    function updateUILanguage() {
        const l = languages[currentLang];
        
        // Update all UI elements with translated text
        if (appTitle) appTitle.textContent = l.appTitle;
        if (appSubtitle) appSubtitle.textContent = l.appSubtitle;
        if (yamlCodeLabel) yamlCodeLabel.textContent = l.yamlCodeLabel;
        if (analyzeBtn) {
            const icon = analyzeBtn.querySelector('i');
            analyzeBtn.innerHTML = '';
            if (icon) analyzeBtn.appendChild(icon);
            analyzeBtn.appendChild(document.createTextNode(' ' + l.analyze));
        }
        if (clearBtn) {
            const icon = clearBtn.querySelector('i');
            clearBtn.innerHTML = '';
            if (icon) clearBtn.appendChild(icon);
            clearBtn.appendChild(document.createTextNode(' ' + l.clear));
        }
        if (loadSampleBtn) {
            const icon = loadSampleBtn.querySelector('i');
            loadSampleBtn.innerHTML = '';
            if (icon) loadSampleBtn.appendChild(icon);
            loadSampleBtn.appendChild(document.createTextNode(' ' + l.loadSample));
        }
        if (successMessage) successMessage.textContent = l.successMessage;
        if (visualizationTitle) visualizationTitle.textContent = l.visualization;
        if (graphTabBtn) {
            const icon = graphTabBtn.querySelector('i');
            graphTabBtn.innerHTML = '';
            if (icon) graphTabBtn.appendChild(icon);
            graphTabBtn.appendChild(document.createTextNode(' ' + l.graphTab));
        }
        if (tableTabBtn) {
            const icon = tableTabBtn.querySelector('i');
            tableTabBtn.innerHTML = '';
            if (icon) tableTabBtn.appendChild(icon);
            tableTabBtn.appendChild(document.createTextNode(' ' + l.tableTab));
        }
        if (tableSearch) tableSearch.placeholder = l.search;
        if (legendTitle) legendTitle.textContent = l.controlTypes;
        if (loaderText) loaderText.textContent = l.loadingMessage;
        if (footerText) footerText.textContent = l.footer;
        
        // Update table headers
        if (tableHeaders.length >= 5) {
            tableHeaders[0].textContent = l.thControlName;
            tableHeaders[1].textContent = l.thType;
            tableHeaders[2].textContent = l.thParent;
            tableHeaders[3].textContent = l.thDependsOn;
            tableHeaders[4].textContent = l.thDependedBy;
        }
        
        // Update zoom control tooltips
        if (zoomInBtn) zoomInBtn.title = l.zoomIn;
        if (zoomOutBtn) zoomOutBtn.title = l.zoomOut;
        if (resetViewBtn) resetViewBtn.title = l.resetView;
    }

    // Apply initial language
    updateUILanguage();
    
    // State variables
    let currentZoomTransform = null;
    
    // Sample YAML data
    const sampleYaml = `  Screen3:
    Properties:
      LoadingSpinnerColor: =RGBA(56, 96, 178, 1)
    Children:
      - Form1:
          Control: Form@2.4.2
          Layout: Vertical
          Properties:
            BorderColor: =RGBA(0, 18, 107, 1)
            DataSource: =Employee_Info
            X: =40
            Y: =40
          Children:
            - Name_DataCard1:
                Control: TypedDataCard@1.0.6
                Variant: TextualEdit
                IsLocked: true
                Properties:
                  BorderColor: =RGBA(0, 18, 107, 1)
                  DataField: ="Name"
                  Default: =ThisItem.Name
                  DisplayName: =DataSourceInfo([@Employee_Info],DataSourceInfo.DisplayName,'Name')
                  Required: =true
                  Update: =DataCardValue1.Value
                Children:
                  - DataCardKey1:
                      Control: Text@0.0.50
                      Properties:
                        Text: =Parent.DisplayName
                  - DataCardValue1:
                      Control: TextInput@0.0.53
                      Properties:
                        Value: =Parent.Default
                        Y: =DataCardKey1.Y + DataCardKey1.Height + 4`;

    // ==== Event Listeners ====
    
    // Analyze Button
    analyzeBtn.addEventListener('click', function() {
        const yamlCode = yamlInput.value.trim();
        const l = languages[currentLang];
        
        if (!yamlCode) {
            showError(l.emptyYamlError);
            return;
        }
        
        startAnalysis(yamlCode);
    });
    
    // Clear Button
    clearBtn.addEventListener('click', function() {
        yamlInput.value = '';
        hideResults();
        hideAlerts();
    });
    
    // Load Sample Button
    loadSampleBtn.addEventListener('click', function() {
        yamlInput.value = sampleYaml;
    });
    
    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Table Search
    tableSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = dependencyTable.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
    
    // Zoom Controls
    zoomInBtn.addEventListener('click', function() {
        zoomGraph(1.2);
    });
    
    zoomOutBtn.addEventListener('click', function() {
        zoomGraph(0.8);
    });
    
    resetViewBtn.addEventListener('click', function() {
        resetGraphView();
    });

    // ==== Main Functions ====
    
    /**
     * Start the analysis process
     * @param {string} yamlCode - The YAML code to analyze
     */
    function startAnalysis(yamlCode) {
        const l = languages[currentLang];
        showLoader();
        hideAlerts();
        
        // Use setTimeout to prevent UI freeze
        setTimeout(() => {
            try {
                // Parse YAML
                let parsedYaml;
                try {
                    parsedYaml = jsyaml.load(yamlCode);
                    console.log('Standard YAML parsing successful:', parsedYaml);
                } catch (e) {
                    console.warn('Standard YAML parsing failed:', e);
                    parsedYaml = parseCustomPowerAppsYaml(yamlCode);
                }
                
                if (!parsedYaml) {
                    throw new Error(l.parsingError);
                }
                
                // Analyze dependencies
                const dependencies = analyzeDependencies(parsedYaml);
                
                // Visualize results
                drawDependencyGraph(dependencies);
                generateDependencyTable(dependencies);
                
                // Show results
                showResults();
                showSuccessAlert();
                hideLoader();
                
            } catch (error) {
                console.error('Analysis error:', error);
                showError(`${l.errorPrefix}${error.message}`);
                hideLoader();
            }
        }, 100);
    }
    
    /**
     * Parse Power Apps specific YAML format
     * @param {string} yamlText - The YAML text to parse
     * @returns {Object} Parsed YAML object
     */
    function parseCustomPowerAppsYaml(yamlText) {
        try {
            // Clean up YAML formatting issues
            const cleanedYaml = yamlText
                .replace(/>\s*\n\s+=/g, '=') // Multi-line string markers
                .replace(/>\s*\n\s+/g, '') 
                .replace(/['"](\w+)['"]\.(\w+)/g, "'$1'.$2") // Fix quotes in references
                .replace(/=(\w+)\.(\w+)\./g, "=$1.$2."); // Fix property chains
            
            // Try parsing with standard parser again
            try {
                return jsyaml.load(cleanedYaml);
            } catch (e) {
                console.warn('Cleaned YAML parsing failed:', e);
            }
            
            // Extract structure manually
            const result = {};
            let currentIndent = -1;
            let currentObject = null;
            let objectStack = [result];
            
            // Find root control(s)
            const rootMatch = yamlText.match(/^\s*(\w+):/m);
            if (rootMatch && rootMatch[1]) {
                const rootName = rootMatch[1];
                result[rootName] = {
                    Properties: {},
                    Children: []
                };
            }
            
            return result;
        } catch (error) {
            console.error('Custom YAML parsing error:', error);
            return null;
        }
    }
    
    /**
     * Analyze dependencies in the YAML structure
     * @param {Object} yaml - Parsed YAML object
     * @returns {Object} Dependency analysis result
     */
    function analyzeDependencies(yaml) {
        const l = languages[currentLang];
        console.log('Analyzing dependencies:', yaml);
        
        const dependencies = {
            nodes: [],
            links: [],
            controlMap: {}
        };
        
        try {
            // Extract root controls
            const rootControls = extractRootControls(yaml);
            console.log('Root controls:', rootControls);
            
            if (rootControls.length === 0) {
                throw new Error(l.rootControlError);
            }
            
            // Process all controls
            const allControls = [];
            
            // Process controls recursively
            function processControls(controls, parent = null) {
                if (!controls) return;
                
                if (Array.isArray(controls)) {
                    controls.forEach(control => {
                        if (typeof control === 'object' && control !== null) {
                            // Handle single-key objects like { controlName: { ... } }
                            if (Object.keys(control).length === 1) {
                                const controlName = Object.keys(control)[0];
                                extractControl(controlName, control[controlName], parent, allControls);
                            }
                        }
                    });
                } else if (typeof controls === 'object' && controls !== null) {
                    // Handle object format
                    Object.keys(controls).forEach(controlName => {
                        extractControl(controlName, controls[controlName], parent, allControls);
                    });
                }
            }
            
            // Start from root controls
            rootControls.forEach(rootControl => {
                extractControl(rootControl.name, rootControl, null, allControls);
            });
            
            // Add all controls to the dependency map
            allControls.forEach(control => {
                dependencies.controlMap[control.id] = control;
            });
            
            // Analyze control dependencies
            analyzeControlDependencies(allControls, dependencies);
            
            // Create nodes array for D3
            dependencies.nodes = allControls.map(control => ({
                id: control.id,
                name: control.name,
                type: control.type,
                parent: control.parent,
                depth: getControlDepth(control.id, dependencies.controlMap),
                inDegree: control.incomingDependencies.length,
                outDegree: control.outgoingDependencies.length
            }));
            
            console.log('Dependency analysis result:', dependencies);
            return dependencies;
            
        } catch (error) {
            console.error('Dependency analysis error:', error);
            throw new Error(`${l.analysisError}${error.message}`);
        }
    }
    
    /**
     * Extract root controls from the YAML structure
     * @param {Object} yaml - Parsed YAML object
     * @returns {Array} Array of root controls
     */
    function extractRootControls(yaml) {
        const rootControls = [];
        
        if (!yaml) return rootControls;
        
        // Case: Array format (root level array)
        if (Array.isArray(yaml)) {
            yaml.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    Object.keys(item).forEach(key => {
                        rootControls.push({
                            name: key,
                            ...item[key]
                        });
                    });
                }
            });
            return rootControls;
        }
        
        // Case: Standard App structure
        if (yaml.App && yaml.App.Controls) {
            yaml.App.Controls.forEach(control => {
                rootControls.push({
                    name: control.Name || Object.keys(control)[0],
                    ...control
                });
            });
            return rootControls;
        }
        
        // Case: Object with screens/controls as direct properties
        Object.keys(yaml).forEach(key => {
            if (typeof yaml[key] === 'object' && yaml[key] !== null) {
                // Check if it's likely a control (has Properties or Children)
                if (yaml[key].Properties || yaml[key].Children) {
                    rootControls.push({
                        name: key,
                        ...yaml[key]
                    });
                }
            }
        });
        
        return rootControls;
    }
    
    /**
     * Extract a control and its children
     * @param {string} name - Control name
     * @param {Object} data - Control data
     * @param {string|null} parent - Parent control ID
     * @param {Array} allControls - Array to collect all controls
     */
    function extractControl(name, data, parent, allControls) {
        // Determine control type
        let type = 'unknown';
        
        if (data.Control) {
            const typeParts = data.Control.split('@');
            type = typeParts[0].toLowerCase();
        } else if (data.Type) {
            type = data.Type.toLowerCase();
        } else if (name.toLowerCase().includes('screen')) {
            type = 'screen';
        } else if (name.toLowerCase().includes('form')) {
            type = 'form';
        } else if (name.toLowerCase().includes('datacard')) {
            type = 'typeddatacard';
        } else if (name.toLowerCase().includes('text') || name.toLowerCase().includes('label')) {
            type = 'text';
        }
        
        // Create control object
        const control = {
            id: name,
            name: name,
            type: type,
            parent: parent,
            properties: data.Properties || {},
            incomingDependencies: [],
            outgoingDependencies: []
        };
        
        // Add to all controls
        allControls.push(control);
        
        // Process children recursively
        if (data.Children) {
            // Start processing children
            processChildren(data.Children, name, allControls);
        }
    }
    
    /**
     * Process control children
     * @param {Array|Object} children - Children controls
     * @param {string} parentId - Parent control ID
     * @param {Array} allControls - Array to collect all controls
     */
    function processChildren(children, parentId, allControls) {
        if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'object' && child !== null) {
                    // Handle single-key objects
                    if (Object.keys(child).length === 1) {
                        const childName = Object.keys(child)[0];
                        extractControl(childName, child[childName], parentId, allControls);
                    }
                }
            });
        } else if (typeof children === 'object' && children !== null) {
            // Handle object format
            Object.keys(children).forEach(childName => {
                extractControl(childName, children[childName], parentId, allControls);
            });
        }
    }
    
    /**
     * Analyze dependencies between controls
     * @param {Array} controls - All controls
     * @param {Object} dependencies - Dependency structure
     */
    function analyzeControlDependencies(controls, dependencies) {
        // First pass: Add parent-child relationships
        controls.forEach(control => {
            if (control.parent) {
                const parentControl = controls.find(c => c.id === control.parent);
                if (parentControl) {
                    // Add parent relationship
                    addDependency(control, parentControl, 'parent', dependencies);
                }
            }
        });
        
        // Second pass: Analyze property expressions
        controls.forEach(control => {
            // Check each property for references to other controls
            Object.entries(control.properties).forEach(([propName, propValue]) => {
                if (typeof propValue === 'string') {
                    // Remove leading = if it exists (Power Apps formula)
                    const formula = propValue.startsWith('=') ? propValue.substring(1) : propValue;
                    
                    // Check for references to other controls
                    controls.forEach(targetControl => {
                        if (targetControl.id !== control.id) {
                            // Check different reference patterns
                            const patterns = [
                                `\\b${targetControl.id}\\.\\w+\\b`, // Control.Property
                                `\\[@${targetControl.id}\\]`, // [@Control]
                                `\\b${targetControl.id}\\b` // Control name only
                            ];
                            
                            for (const pattern of patterns) {
                                if (new RegExp(pattern, 'i').test(formula)) {
                                    addDependency(control, targetControl, propName, dependencies);
                                    break;
                                }
                            }
                        }
                    });
                    
                    // Special case: Parent references
                    if (formula.includes('Parent.') && control.parent) {
                        const parentControl = controls.find(c => c.id === control.parent);
                        if (parentControl) {
                            addDependency(control, parentControl, propName, dependencies);
                        }
                    }
                    
                    // Special case: ThisItem references (form data binding)
                    if (formula.includes('ThisItem.') && control.parent) {
                        // Find the form control (ancestor that is a form)
                        let currentParentId = control.parent;
                        let formControl = null;
                        
                        while (currentParentId) {
                            const parent = controls.find(c => c.id === currentParentId);
                            if (parent && parent.type === 'form') {
                                formControl = parent;
                                break;
                            }
                            currentParentId = parent ? parent.parent : null;
                        }
                        
                        if (formControl) {
                            addDependency(control, formControl, 'data', dependencies);
                        }
                    }
                }
            });
        });
    }
    
    /**
     * Add a dependency between two controls
     * @param {Object} sourceControl - Source control
     * @param {Object} targetControl - Target control
     * @param {string} reason - Reason for dependency
     * @param {Object} dependencies - Dependency structure
     */
    function addDependency(sourceControl, targetControl, reason, dependencies) {
        // Add to outgoing dependencies if not already present
        if (!sourceControl.outgoingDependencies.includes(targetControl.id)) {
            sourceControl.outgoingDependencies.push(targetControl.id);
        }
        
        // Add to incoming dependencies if not already present
        if (!targetControl.incomingDependencies.includes(sourceControl.id)) {
            targetControl.incomingDependencies.push(sourceControl.id);
        }
        
        // Check if the link already exists
        const existingLink = dependencies.links.find(link => 
            link.source === sourceControl.id && link.target === targetControl.id);
            
        if (!existingLink) {
            // Add link
            dependencies.links.push({
                source: sourceControl.id,
                target: targetControl.id,
                reason: reason
            });
        }
    }
    
    /**
     * Calculate the depth of a control in the hierarchy
     * @param {string} controlId - Control ID
     * @param {Object} controlMap - Map of all controls
     * @returns {number} Depth level (0 for root)
     */
    function getControlDepth(controlId, controlMap) {
        let depth = 0;
        let current = controlMap[controlId];
        
        while (current && current.parent) {
            depth++;
            current = controlMap[current.parent];
        }
        
        return depth;
    }
    
    /**
     * Draw the dependency graph using D3.js
     * @param {Object} dependencies - Dependency structure
     */
    function drawDependencyGraph(dependencies) {
        const l = languages[currentLang];
        
        // Clear previous graph
        graphContainer.innerHTML = '';
        
        // Set dimensions
        const width = graphContainer.clientWidth;
        const height = graphContainer.clientHeight;
        
        // Create SVG element
        const svg = d3.select(graphContainer)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, width, height]);
            
        // Create container group with zoom/pan behavior
        const g = svg.append('g');
        
        // Create zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
                currentZoomTransform = event.transform;
            });
            
        // Apply zoom behavior to SVG
        svg.call(zoom);
        
        // Prepare nodes and links data
        const nodes = dependencies.nodes.map(d => ({...d}));
        
        // Prepare links: ensure sourceId and targetId point to valid nodes
        const nodeIds = new Set(nodes.map(node => node.id));
        const links = dependencies.links
            .filter(link => nodeIds.has(link.source) && nodeIds.has(link.target))
            .map(link => ({...link}));
            
        console.log('Graph nodes:', nodes);
        console.log('Graph links:', links);
        
        // Create force simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links)
                .id(d => d.id)
                .distance(d => 100 + d.source.outDegree * 5 + d.target.inDegree * 5))
            .force('charge', d3.forceManyBody()
                .strength(d => -300 - d.inDegree * 50 - d.outDegree * 50))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => 20 + Math.min(d.inDegree + d.outDegree, 10)));

        // Add defs for arrowheads
        const defs = svg.append('defs');
        
        defs.append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 25)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#aaa');
            
        // Create links
        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('class', 'link')
            .attr('marker-end', 'url(#arrowhead)')
            .attr('stroke-dasharray', d => d.reason === 'parent' ? '0' : '5,5')
            .attr('stroke-width', d => d.reason === 'parent' ? 2 : 1.5)
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .attr('stroke-opacity', 1)
                    .attr('stroke-width', d.reason === 'parent' ? 3 : 2);
                    
                // Show tooltip
                const sourceControl = dependencies.controlMap[d.source.id || d.source];
                const targetControl = dependencies.controlMap[d.target.id || d.target];
                
                const tooltipContent = `
                    <div class="tooltip-title">${l.ttDependency}</div>
                    <div class="tooltip-content">
                        <div>${l.ttSource}: ${sourceControl.name}</div>
                        <div>${l.ttTarget}: ${targetControl.name}</div>
                        <div>${l.ttType}: ${getDependencyTypeName(d.reason)}</div>
                    </div>
                `;
                
                showTooltip(event, tooltipContent);
            })
            .on('mouseout', function() {
                d3.select(this)
                    .attr('stroke-opacity', 0.6)
                    .attr('stroke-width', d => d.reason === 'parent' ? 2 : 1.5);
                    
                hideTooltip();
            });
            
        // Create nodes
        const node = g.append('g')
            .attr('class', 'nodes')
            .selectAll('.node')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));
                
        // Add circles to nodes
        node.append('circle')
            .attr('r', d => 5 + Math.min(d.inDegree + d.outDegree, 10))
            .attr('fill', d => getNodeColor(d.type))
            .on('mouseover', function(event, d) {
                // Highlight node
                d3.select(this)
                    .attr('stroke', '#ff9900')
                    .attr('stroke-width', 3);
                    
                // Highlight connected links
                link.each(function(l) {
                    if ((l.source.id === d.id || l.target.id === d.id) ||
                        (l.source === d.id || l.target === d.id)) {
                        d3.select(this)
                            .attr('stroke-opacity', 1)
                            .attr('stroke-width', l.reason === 'parent' ? 3 : 2);
                    }
                });
                
                // Show tooltip
                const control = dependencies.controlMap[d.id];
                
                const tooltipContent = `
                    <div class="tooltip-title">${d.name}</div>
                    <div class="tooltip-content">
                        <div>${l.ttControlType}: ${getControlTypeName(d.type)}</div>
                        <div>${l.ttIncomingDeps}: ${control.incomingDependencies.length}</div>
                        <div>${l.ttOutgoingDeps}: ${control.outgoingDependencies.length}</div>
                        ${d.parent ? `<div>${l.ttParent}: ${d.parent}</div>` : ''}
                    </div>
                `;
                
                showTooltip(event, tooltipContent);
            })
            .on('mouseout', function() {
                // Remove highlight
                d3.select(this)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 2);
                    
                // Reset links
                link.attr('stroke-opacity', 0.6)
                    .attr('stroke-width', d => d.reason === 'parent' ? 2 : 1.5);
                    
                hideTooltip();
            });
            
        // Add text labels to nodes
        node.append('text')
            .attr('dx', d => 8 + Math.min(d.inDegree + d.outDegree, 10))
            .attr('dy', '.35em')
            .text(d => d.name)
            .style('font-size', d => {
                // Set larger font for important nodes
                if (d.type === 'screen' || d.type === 'form') {
                    return '14px';
                }
                return '12px';
            })
            .style('font-weight', d => {
                // Bold for important nodes
                if (d.type === 'screen' || d.type === 'form') {
                    return 'bold';
                }
                return 'normal';
            });
            
        // Update positions on each tick
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
                
            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });
        
        // Improve initial positions based on hierarchy
        layoutHierarchically(nodes, links, width, height);
        
        // Start simulation with high alpha to ensure good layout
        simulation.alpha(1).restart();
        
        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            // Keep position fixed if during active layout
            if (simulation.alpha() < 0.1) {
                d.fx = null;
                d.fy = null;
            }
        }
        
        // Store the zoom object for external controls
        graphContainer._zoom = zoom;
    }

    /**
     * Show tooltip with content
     * @param {Event} event - Mouse event
     * @param {string} content - HTML content for tooltip
     */
    function showTooltip(event, content) {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = content;
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY - 10}px`;
        tooltip.style.display = 'block';
    }

    /**
     * Hide tooltip
     */
    function hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    }
    
    /**
     * Layout nodes hierarchically
     * @param {Array} nodes - Nodes array
     * @param {Array} links - Links array
     * @param {number} width - Container width
     * @param {number} height - Container height
     */
    function layoutHierarchically(nodes, links, width, height) {
        // Find the maximum depth
        const maxDepth = Math.max(...nodes.map(n => n.depth));
        
        // Group nodes by depth
        const nodesByDepth = {};
        nodes.forEach(node => {
            if (!nodesByDepth[node.depth]) {
                nodesByDepth[node.depth] = [];
            }
            nodesByDepth[node.depth].push(node);
        });
        
        // Position nodes based on depth
        const levelHeight = height / (maxDepth + 2);
        
        for (let depth = 0; depth <= maxDepth; depth++) {
            const levelNodes = nodesByDepth[depth] || [];
            const levelWidth = width / (levelNodes.length + 1);
            
            levelNodes.forEach((node, i) => {
                // Initial position based on hierarchy
                node.x = levelWidth * (i + 1);
                node.y = levelHeight * (depth + 1);
                
                // Use fixed position initially to help convergence
                node.fx = node.x;
                node.fy = node.y;
                
                // Release constraints after delay
                setTimeout(() => {
                    node.fx = null;
                    node.fy = null;
                }, 1500);
            });
        }
    }
    
    /**
     * Generate the dependency table
     * @param {Object} dependencies - Dependency structure
     */
    function generateDependencyTable(dependencies) {
        const l = languages[currentLang];
        
        // Clear existing table
        const tbody = dependencyTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        // Check if we have nodes
        if (!dependencies.nodes || dependencies.nodes.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 5;
            cell.textContent = l.noControls;
            cell.style.textAlign = 'center';
            row.appendChild(cell);
            tbody.appendChild(row);
            return;
        }
        
        // Add rows for each control, sorted by type and name
        dependencies.nodes
            .sort((a, b) => {
                // Sort by type first
                if (a.type !== b.type) {
                    // Screens and forms first
                    if (a.type === 'screen' || a.type === 'form') return -1;
                    if (b.type === 'screen' || b.type === 'form') return 1;
                    
                    // Then DataCards
                    if (a.type.includes('datacard')) return -1;
                    if (b.type.includes('datacard')) return 1;
                    
                    return a.type.localeCompare(b.type);
                }
                
                // Then by name
                return a.name.localeCompare(b.name);
            })
            .forEach(node => {
                const control = dependencies.controlMap[node.id];
                const row = document.createElement('tr');
                
                // Control name
                const nameCell = document.createElement('td');
                nameCell.textContent = node.name;
                row.appendChild(nameCell);
                
                // Control type
                const typeCell = document.createElement('td');
                typeCell.textContent = getControlTypeName(node.type);
                row.appendChild(typeCell);
                
                // Parent control
                const parentCell = document.createElement('td');
                parentCell.textContent = node.parent || '—';
                row.appendChild(parentCell);
                
                // Dependencies (outgoing)
                const outgoingCell = document.createElement('td');
                if (control.outgoingDependencies.length > 0) {
                    outgoingCell.textContent = control.outgoingDependencies.join(', ');
                } else {
                    outgoingCell.textContent = '—';
                }
                row.appendChild(outgoingCell);
                
                // Dependencies (incoming)
                const incomingCell = document.createElement('td');
                if (control.incomingDependencies.length > 0) {
                    incomingCell.textContent = control.incomingDependencies.join(', ');
                } else {
                    incomingCell.textContent = '—';
                }
                row.appendChild(incomingCell);
                
                tbody.appendChild(row);
            });
    }
    
    // ==== Utility Functions ====
    
    /**
     * Get control type display name
     * @param {string} type - Control type
     * @returns {string} Display name
     */
    function getControlTypeName(type) {
        const l = languages[currentLang];
        const type_lower = type.toLowerCase();
        
        const typeMap = {
            'screen': l.ctScreen,
            'form': l.ctForm,
            'typeddatacard': l.ctDataCard,
            'text': l.ctTextLabel,
            'textinput': l.ctTextInput,
            'combobox': l.ctComboBox,
            'dropdown': l.ctDropDown,
            'datepicker': l.ctDatePicker,
            'button': l.ctButton,
            'gallery': l.ctGallery,
            'image': l.ctImage
        };
        
        return typeMap[type_lower] || type;
    }
    
    /**
     * Get dependency type display name
     * @param {string} reason - Dependency reason
     * @returns {string} Display name
     */
    function getDependencyTypeName(reason) {
        const l = languages[currentLang];
        
        const reasonMap = {
            'parent': l.dtParentChild,
            'data': l.dtDataBinding,
            'default': l.dtPropertyRef
        };
        
        return reasonMap[reason] || l.dtPropertyRef;
    }
    
    /**
     * Get color for node based on control type
     * @param {string} type - Control type
     * @returns {string} Color hex code
     */
    function getNodeColor(type) {
        const type_lower = type.toLowerCase();
        
        if (type_lower === 'screen' || type_lower === 'form') {
            return '#742774'; // Power Apps purple
        } else if (type_lower.includes('datacard')) {
            return '#d13438'; // Red
        } else if (type_lower.includes('text') || type_lower.includes('label')) {
            return '#107c10'; // Green
        } else if (type_lower.includes('input') || type_lower.includes('combo') || 
                   type_lower.includes('date') || type_lower.includes('picker')) {
            return '#8764b8'; // Purple
        } else if (type_lower.includes('button')) {
            return '#ffb900'; // Orange
        }
        
        return '#8a8886'; // Gray (default)
    }
    
    /**
     * Zoom the graph in or out
     * @param {number} factor - Zoom factor (> 1 for in, < 1 for out)
     */
    function zoomGraph(factor) {
        if (!graphContainer._zoom) return;
        
        const svg = d3.select(graphContainer).select('svg');
        
        // Get current transform or create identity transform
        const transform = currentZoomTransform || d3.zoomIdentity;
        
        // Apply new scale
        const newScale = transform.k * factor;
        const newTransform = transform.scale(factor);
        
        // Apply the transform
        svg.call(graphContainer._zoom.transform, newTransform);
    }
    
    /**
     * Reset the graph view to initial state
     */
    function resetGraphView() {
        if (!graphContainer._zoom) return;
        
        const svg = d3.select(graphContainer).select('svg');
        svg.call(graphContainer._zoom.transform, d3.zoomIdentity);
        currentZoomTransform = null;
    }
    
    // ==== UI Helpers ====
    
    function showLoader() {
        loader.style.display = 'flex';
    }
    
    function hideLoader() {
        loader.style.display = 'none';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorAlert.style.display = 'flex';
        successAlert.style.display = 'none';
    }
    
    function showSuccessAlert() {
        successAlert.style.display = 'flex';
        errorAlert.style.display = 'none';
    }
    
    function hideAlerts() {
        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';
    }
    
    function showResults() {
        resultSection.style.display = 'block';
    }
    
    function hideResults() {
        resultSection.style.display = 'none';
    }
});