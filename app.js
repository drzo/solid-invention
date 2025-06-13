// Application data from provided JSON
const appData = {
  emotions: ["Interest", "Joy", "Surprise", "Sadness", "Anger", "Disgust", "Contempt", "Fear", "Shame", "Guilt"],
  juliaPackages: [
    {"name": "DifferentialEquations.jl", "status": "active", "version": "7.8.0", "performance": 98},
    {"name": "ModelingToolkit.jl", "status": "active", "version": "8.73.2", "performance": 95},
    {"name": "ReservoirComputing.jl", "status": "active", "version": "0.8.1", "performance": 92},
    {"name": "BSeries.jl", "status": "active", "version": "0.7.4", "performance": 89},
    {"name": "RootedTrees.jl", "status": "active", "version": "2.18.1", "performance": 94}
  ],
  reservoirParams: {
    size: 1000,
    spectralRadius: 1.2,
    inputScaling: 0.8,
    leakingRate: 0.9,
    connectivity: 0.1
  },
  systemMetrics: {
    processingSpeed: 2.4,
    memoryUsage: 65,
    powerConsumption: 48.2,
    accuracy: 94.7,
    throughput: 1847
  }
};

// Global state management
let systemState = {
  isProcessing: true,
  currentTab: 'overview',
  lastUpdate: Date.now(),
  emotionData: {},
  reservoirState: [],
  charts: {}
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeData();
  initializeCharts();
  initializeControls();
  startRealTimeUpdates();
});

// Navigation functionality
function initializeNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Update active states
      navTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
      
      systemState.currentTab = targetTab;
      
      // Trigger specific initializations for tabs
      if (targetTab === 'reservoir') {
        initializeReservoirVisualization();
      } else if (targetTab === 'emotions') {
        initializeEmotionVisualization();
      } else if (targetTab === 'membranes') {
        initializeMembraneVisualization();
      } else if (targetTab === 'optimization') {
        initializeOptimizationVisualization();
      }
    });
  });
}

// Initialize data displays
function initializeData() {
  populatePackageList();
  populateSystemMetrics();
  populateReservoirParams();
  populateEmotionsGrid();
  populateMembraneActivity();
  populateOptimizationData();
  populateHardwareData();
}

// Populate Julia package list
function populatePackageList() {
  const packageList = document.getElementById('package-list');
  packageList.innerHTML = '';
  
  appData.juliaPackages.forEach(pkg => {
    const packageItem = document.createElement('div');
    packageItem.className = 'package-item';
    packageItem.innerHTML = `
      <div class="package-info">
        <div class="package-name">${pkg.name}</div>
        <div class="package-version">v${pkg.version}</div>
      </div>
      <div class="package-performance">
        <div class="performance-bar">
          <div class="performance-fill" style="width: ${pkg.performance}%"></div>
        </div>
        <span>${pkg.performance}%</span>
      </div>
    `;
    packageList.appendChild(packageItem);
  });
}

// Populate system metrics
function populateSystemMetrics() {
  document.getElementById('processing-speed').textContent = appData.systemMetrics.processingSpeed;
  document.getElementById('accuracy').textContent = appData.systemMetrics.accuracy;
  document.getElementById('throughput').textContent = appData.systemMetrics.throughput;
  document.getElementById('memory-usage').textContent = appData.systemMetrics.memoryUsage;
}

// Populate reservoir parameters
function populateReservoirParams() {
  document.getElementById('spectral-radius').textContent = appData.reservoirParams.spectralRadius;
  document.getElementById('input-scaling').textContent = appData.reservoirParams.inputScaling;
  document.getElementById('leaking-rate').textContent = appData.reservoirParams.leakingRate;
  document.getElementById('connectivity').textContent = appData.reservoirParams.connectivity;
}

// Populate emotions grid
function populateEmotionsGrid() {
  const emotionsGrid = document.getElementById('emotions-grid');
  emotionsGrid.innerHTML = '';
  
  appData.emotions.forEach(emotion => {
    const intensity = Math.floor(Math.random() * 100);
    systemState.emotionData[emotion] = intensity;
    
    const emotionItem = document.createElement('div');
    emotionItem.className = 'emotion-item';
    emotionItem.innerHTML = `
      <div class="emotion-name">${emotion}</div>
      <div class="emotion-intensity">${intensity}</div>
    `;
    emotionsGrid.appendChild(emotionItem);
  });
}

// Initialize charts
function initializeCharts() {
  initializeReservoirChart();
  initializeEmotionTimelineChart();
  initializeConvergenceChart();
  initializeEfficiencyChart();
}

// Reservoir state chart
function initializeReservoirChart() {
  const ctx = document.getElementById('reservoir-chart');
  if (!ctx) return;
  
  const data = Array.from({length: 50}, () => Math.random() * 2 - 1);
  
  systemState.charts.reservoir = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({length: 50}, (_, i) => i),
      datasets: [{
        label: 'Reservoir State',
        data: data,
        borderColor: '#32b8c6',
        backgroundColor: 'rgba(50, 184, 198, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#e8e9ea' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' }
        }
      }
    }
  });
}

// Emotion timeline chart
function initializeEmotionTimelineChart() {
  const ctx = document.getElementById('emotion-timeline-chart');
  if (!ctx) return;
  
  const timeLabels = Array.from({length: 20}, (_, i) => `${i}s`);
  const datasets = ['Joy', 'Anger', 'Fear'].map((emotion, index) => ({
    label: emotion,
    data: Array.from({length: 20}, () => Math.random() * 100),
    borderColor: ['#32b8c6', '#ef4444', '#f59e0b'][index],
    backgroundColor: `rgba(${index === 0 ? '50, 184, 198' : index === 1 ? '239, 68, 68' : '245, 158, 11'}, 0.1)`,
    borderWidth: 2,
    fill: false,
    tension: 0.4
  }));
  
  systemState.charts.emotionTimeline = new Chart(ctx, {
    type: 'line',
    data: { labels: timeLabels, datasets: datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#e8e9ea' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' },
          min: 0,
          max: 100
        }
      }
    }
  });
}

// Optimization convergence chart
function initializeConvergenceChart() {
  const ctx = document.getElementById('convergence-chart');
  if (!ctx) return;
  
  const iterations = Array.from({length: 50}, (_, i) => i);
  const convergenceData = iterations.map(i => Math.exp(-i/10) * 100 + Math.random() * 5);
  
  systemState.charts.convergence = new Chart(ctx, {
    type: 'line',
    data: {
      labels: iterations,
      datasets: [{
        label: 'Optimization Error',
        data: convergenceData,
        borderColor: '#32b8c6',
        backgroundColor: 'rgba(50, 184, 198, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#e8e9ea' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' },
          min: 0
        }
      }
    }
  });
}

// Hardware efficiency chart
function initializeEfficiencyChart() {
  const ctx = document.getElementById('efficiency-chart');
  if (!ctx) return;
  
  const timeLabels = Array.from({length: 24}, (_, i) => `${i}:00`);
  const efficiencyData = timeLabels.map(() => 85 + Math.random() * 15);
  
  systemState.charts.efficiency = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: timeLabels,
      datasets: [{
        label: 'Efficiency %',
        data: efficiencyData,
        backgroundColor: '#32b8c6',
        borderColor: '#00d2ff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#e8e9ea' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' },
          min: 0,
          max: 100
        }
      }
    }
  });
}

// Initialize reservoir visualization
function initializeReservoirVisualization() {
  const topologyNetwork = document.getElementById('topology-network');
  if (!topologyNetwork || topologyNetwork.children.length > 0) return;
  
  // Create network nodes
  for (let i = 0; i < 20; i++) {
    const node = document.createElement('div');
    node.className = 'topology-node';
    node.style.left = `${Math.random() * 90}%`;
    node.style.top = `${Math.random() * 90}%`;
    node.style.animationDelay = `${Math.random() * 2}s`;
    topologyNetwork.appendChild(node);
  }
}

// Initialize emotion visualization
function initializeEmotionVisualization() {
  const classificationResults = document.getElementById('classification-results');
  if (!classificationResults) return;
  
  classificationResults.innerHTML = '';
  
  const topEmotions = appData.emotions.slice(0, 5);
  topEmotions.forEach(emotion => {
    const confidence = (80 + Math.random() * 20).toFixed(1);
    const item = document.createElement('div');
    item.className = 'classification-item';
    item.innerHTML = `
      <span>${emotion}</span>
      <span class="confidence-score">${confidence}%</span>
    `;
    classificationResults.appendChild(item);
  });
}

// Initialize membrane visualization
function initializeMembraneVisualization() {
  const membraneViz = document.getElementById('membrane-viz');
  if (!membraneViz || membraneViz.children.length > 0) return;
  
  // Create membrane layers
  for (let i = 0; i < 4; i++) {
    const layer = document.createElement('div');
    layer.className = 'membrane-layer';
    const size = 80 + i * 40;
    layer.style.width = `${size}px`;
    layer.style.height = `${size}px`;
    layer.style.left = `${50 - size/2}%`;
    layer.style.top = `${50 - size/2}%`;
    layer.style.animationDelay = `${i * 0.5}s`;
    membraneViz.appendChild(layer);
  }
}

// Populate membrane activity
function populateMembraneActivity() {
  const activityMonitor = document.getElementById('activity-monitor');
  if (!activityMonitor) return;
  
  activityMonitor.innerHTML = '';
  
  ['Outer', 'Middle', 'Inner'].forEach(region => {
    const activity = Math.floor(Math.random() * 100);
    const item = document.createElement('div');
    item.className = 'activity-region';
    item.innerHTML = `
      <div>${region} Membrane</div>
      <div class="activity-level">
        <div class="activity-fill" style="width: ${activity}%"></div>
      </div>
    `;
    activityMonitor.appendChild(item);
  });
  
  const rulesList = document.getElementById('rules-list');
  if (!rulesList) return;
  
  rulesList.innerHTML = '';
  
  const rules = [
    'a → b⁺c⁻',
    'b⁺ → d⁺e⁻',
    'c⁻d⁺ → f⁺',
    'e⁻f⁺ → g⁺h⁻'
  ];
  
  rules.forEach(rule => {
    const item = document.createElement('div');
    item.className = 'rule-item';
    item.innerHTML = `
      <span>${rule}</span>
      <div class="rule-status"></div>
    `;
    rulesList.appendChild(item);
  });
}

// Initialize optimization visualization
function initializeOptimizationVisualization() {
  const treeViz = document.getElementById('tree-viz');
  if (!treeViz || treeViz.children.length > 0) return;
  
  // Create tree nodes
  const nodes = [
    {x: 50, y: 20}, {x: 30, y: 50}, {x: 70, y: 50},
    {x: 20, y: 80}, {x: 40, y: 80}, {x: 60, y: 80}, {x: 80, y: 80}
  ];
  
  nodes.forEach((node, i) => {
    const element = document.createElement('div');
    element.className = 'tree-node';
    element.style.left = `${node.x}%`;
    element.style.top = `${node.y}%`;
    treeViz.appendChild(element);
  });
  
  // Create connections
  const connections = [
    {from: 0, to: 1}, {from: 0, to: 2},
    {from: 1, to: 3}, {from: 1, to: 4},
    {from: 2, to: 5}, {from: 2, to: 6}
  ];
  
  connections.forEach(conn => {
    const line = document.createElement('div');
    line.className = 'tree-connection';
    const fromNode = nodes[conn.from];
    const toNode = nodes[conn.to];
    const length = Math.sqrt(Math.pow(toNode.x - fromNode.x, 2) + Math.pow(toNode.y - fromNode.y, 2));
    const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) * 180 / Math.PI;
    
    line.style.width = `${length}%`;
    line.style.left = `${fromNode.x}%`;
    line.style.top = `${fromNode.y}%`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 50%';
    treeViz.appendChild(line);
  });
}

// Populate optimization data
function populateOptimizationData() {
  const bseriesDisplay = document.getElementById('bseries-display');
  if (!bseriesDisplay) return;
  
  bseriesDisplay.innerHTML = '';
  
  const coefficients = [
    ['b₁', '1.0000'],
    ['b₂', '0.5000'],
    ['b₃', '0.1667'],
    ['b₄', '0.0833'],
    ['b₅', '0.0333']
  ];
  
  coefficients.forEach(([name, value]) => {
    const item = document.createElement('div');
    item.className = 'bseries-item';
    item.innerHTML = `
      <span>${name}</span>
      <span class="coefficient">${value}</span>
    `;
    bseriesDisplay.appendChild(item);
  });
}

// Populate hardware data
function populateHardwareData() {
  document.getElementById('power-consumption').textContent = appData.systemMetrics.powerConsumption;
  
  const utilizationGrid = document.getElementById('utilization-grid');
  if (!utilizationGrid) return;
  
  utilizationGrid.innerHTML = '';
  
  const utilization = [
    ['CPU', '78%'],
    ['Memory', '65%'],
    ['GPU', '92%'],
    ['Network', '34%']
  ];
  
  utilization.forEach(([label, value]) => {
    const item = document.createElement('div');
    item.className = 'utilization-item';
    item.innerHTML = `
      <div class="utilization-value">${value}</div>
      <div class="utilization-label">${label}</div>
    `;
    utilizationGrid.appendChild(item);
  });
}

// Initialize controls
function initializeControls() {
  // System control buttons
  document.getElementById('start-processing').addEventListener('click', () => {
    systemState.isProcessing = true;
    updateProcessingStatus();
  });
  
  document.getElementById('pause-processing').addEventListener('click', () => {
    systemState.isProcessing = false;
    updateProcessingStatus();
  });
  
  document.getElementById('reset-system').addEventListener('click', () => {
    resetSystem();
  });
  
  // Parameter sliders
  const learningRateSlider = document.getElementById('learning-rate');
  const emotionSensitivitySlider = document.getElementById('emotion-sensitivity');
  
  learningRateSlider.addEventListener('input', (e) => {
    e.target.nextElementSibling.textContent = e.target.value;
  });
  
  emotionSensitivitySlider.addEventListener('input', (e) => {
    e.target.nextElementSibling.textContent = e.target.value;
  });
  
  // Export buttons
  document.getElementById('export-data').addEventListener('click', exportData);
  document.getElementById('save-config').addEventListener('click', saveConfig);
}

// Update processing status
function updateProcessingStatus() {
  const processingDots = document.querySelectorAll('.status-dot.active');
  processingDots.forEach(dot => {
    if (systemState.isProcessing) {
      dot.style.animation = 'pulse 2s infinite';
    } else {
      dot.style.animation = 'none';
      dot.style.opacity = '0.5';
    }
  });
}

// Reset system
function resetSystem() {
  // Reset all charts
  Object.values(systemState.charts).forEach(chart => {
    if (chart && chart.data) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(() => Math.random() * 100);
      });
      chart.update();
    }
  });
  
  // Reset emotion data
  populateEmotionsGrid();
  
  // Reset other visualizations
  systemState.isProcessing = true;
  updateProcessingStatus();
}

// Export data function
function exportData() {
  const data = {
    timestamp: new Date().toISOString(),
    systemMetrics: appData.systemMetrics,
    emotionData: systemState.emotionData,
    reservoirParams: appData.reservoirParams
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'deep-tree-echo-data.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Save configuration function
function saveConfig() {
  const config = {
    timestamp: new Date().toISOString(),
    parameters: {
      learningRate: document.getElementById('learning-rate').value,
      emotionSensitivity: document.getElementById('emotion-sensitivity').value,
      reservoirParams: appData.reservoirParams
    }
  };
  
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'deep-tree-echo-config.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Real-time updates
function startRealTimeUpdates() {
  setInterval(() => {
    if (!systemState.isProcessing) return;
    
    updateMetrics();
    updateCharts();
    updateEmotions();
    updateVisualization();
  }, 2000);
}

// Update metrics with realistic variations
function updateMetrics() {
  const metrics = appData.systemMetrics;
  
  // Add small random variations
  const processingSpeed = metrics.processingSpeed + (Math.random() - 0.5) * 0.2;
  const accuracy = Math.max(90, Math.min(99, metrics.accuracy + (Math.random() - 0.5) * 2));
  const throughput = metrics.throughput + Math.floor((Math.random() - 0.5) * 100);
  const memoryUsage = Math.max(50, Math.min(85, metrics.memoryUsage + (Math.random() - 0.5) * 5));
  
  document.getElementById('processing-speed').textContent = processingSpeed.toFixed(1);
  document.getElementById('accuracy').textContent = accuracy.toFixed(1);
  document.getElementById('throughput').textContent = throughput;
  document.getElementById('memory-usage').textContent = Math.floor(memoryUsage);
}

// Update charts with new data
function updateCharts() {
  // Update reservoir chart
  if (systemState.charts.reservoir) {
    const chart = systemState.charts.reservoir;
    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(Math.random() * 2 - 1);
    chart.update('none');
  }
  
  // Update emotion timeline chart
  if (systemState.charts.emotionTimeline) {
    const chart = systemState.charts.emotionTimeline;
    chart.data.datasets.forEach(dataset => {
      dataset.data.shift();
      dataset.data.push(Math.random() * 100);
    });
    chart.update('none');
  }
}

// Update emotion displays
function updateEmotions() {
  const emotionItems = document.querySelectorAll('.emotion-intensity');
  emotionItems.forEach(item => {
    const currentValue = parseInt(item.textContent);
    const newValue = Math.max(0, Math.min(100, currentValue + (Math.random() - 0.5) * 10));
    item.textContent = Math.floor(newValue);
  });
  
  // Update classification results
  initializeEmotionVisualization();
}

// Update visualizations
function updateVisualization() {
  // Update membrane activity
  const activityFills = document.querySelectorAll('.activity-fill');
  activityFills.forEach(fill => {
    const newWidth = Math.random() * 100;
    fill.style.width = `${newWidth}%`;
  });
  
  // Update power consumption
  const powerValue = document.getElementById('power-consumption');
  if (powerValue) {
    const currentPower = parseFloat(powerValue.textContent);
    const newPower = Math.max(40, Math.min(60, currentPower + (Math.random() - 0.5) * 2));
    powerValue.textContent = newPower.toFixed(1);
  }
}