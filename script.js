let selectedChemicals = [];

// Chemistry Experiment Functions
function selectChemical(chemical) {
    if (selectedChemicals.length < 2) {
        selectedChemicals.push(chemical);
        document.getElementById('selected-chemicals').innerText = selectedChemicals.join(' and ');
    } else {
        alert("You can only select two chemicals.");
    }
}

function reactChemicals() {
    let resultDiv = document.getElementById('experiment-result');
    if (selectedChemicals.length !== 2) {
        resultDiv.innerHTML = 'Please select two chemicals.';
        return;
    }

    let reactions = {
        'HCl and NaOH': 'Result: NaCl (Salt) and H2O (Water)',
        'H2SO4 and KOH': 'Result: K2SO4 (Potassium Sulfate) and H2O (Water)',
        'HNO3 and NH3': 'Result: NH4NO3 (Ammonium Nitrate)',
        'CH3COOH and Ca(OH)2': 'Result: Ca(CH3COO)2 (Calcium Acetate) and H2O (Water)',
        'H2CO3 and KOH': 'Result: KHCO3 (Potassium Bicarbonate) and H2O (Water)',
        'HCl and Ca(OH)2': 'Result: CaCl2 (Calcium Chloride) and H2O (Water)',
        'H2SO4 and NaOH': 'Result: Na2SO4 (Sodium Sulfate) and H2O (Water)',
        'HNO3 and KOH': 'Result: KNO3 (Potassium Nitrate) and H2O (Water)',
        'CH3COOH and NaOH': 'Result: CH3COONa (Sodium Acetate) and H2O (Water)',
        'HCl and NH3': 'Result: NH4Cl (Ammonium Chloride)',
    };

    let reactionKey = selectedChemicals.sort().join(' and ');
    let result = reactions[reactionKey] || 'No reaction found for the selected chemicals.';

    resultDiv.innerHTML = result;
    selectedChemicals = [];
    document.getElementById('selected-chemicals').innerText = '';
}

// Physics Experiment Functions
function showPhysicsExperiment(experiment) {
    let inputsDiv = document.getElementById('physics-experiment-inputs');
    inputsDiv.innerHTML = '';
    document.getElementById('experiment-result').innerHTML = '';

    if (experiment === 'work') {
        inputsDiv.innerHTML = `
            <h3>Calculate Work</h3>
            <label>Force (N):</label>
            <input type="number" id="force" required>
            <label>Distance (m):</label>
            <input type="number" id="distance" required>
            <button onclick="calculateWork()">Calculate</button>
        `;
    } else if (experiment === 'projectile') {
        inputsDiv.innerHTML = `
            <h3>Projectile Motion</h3>
            <label>Initial Velocity (m/s):</label>
            <input type="number" id="velocity" required>
            <label>Angle (degrees):</label>
            <input type="number" id="angle" required>
            <button onclick="calculateProjectile()">Calculate</button>
        `;
    }
}

function calculateWork() {
    let force = document.getElementById('force').value;
    let distance = document.getElementById('distance').value;
    let work = force * distance;
    document.getElementById('experiment-result').innerHTML = `Work done: ${work} Joules`;
    
    // Save the experiment details
    saveExperiment(`Work Experiment - Force: ${force}, Distance: ${distance}, Result: ${work} Joules`);
}

function calculateProjectile() {
    let velocity = document.getElementById('velocity').value;
    let angle = document.getElementById('angle').value;
    let radians = (angle * Math.PI) / 180;
    let range = (Math.pow(velocity, 2) * Math.sin(2 * radians)) / 9.8;
    document.getElementById('experiment-result').innerHTML = `Projectile Range: ${range.toFixed(2)} meters`;
    
    // Save the experiment details
    saveExperiment(`Projectile Motion - Velocity: ${velocity}, Angle: ${angle}, Range: ${range.toFixed(2)} meters`);
}

// Mathematics Experiment Functions
function showMathExperiment(experiment) {
    let inputsDiv = document.getElementById('math-experiment-inputs');
    inputsDiv.innerHTML = '';
    document.getElementById('experiment-result').innerHTML = '';

    if (experiment === 'arithmetic') {
        inputsDiv.innerHTML = `
            <h3>Arithmetic Operations</h3>
            <label>Expression:</label>
            <input type="text" id="expression" placeholder="e.g., 3+5*2-4/2" required>
            <button onclick="calculateArithmetic()">Calculate</button>
        `;
    } else if (experiment === 'statistics') {
        inputsDiv.innerHTML = `
            <h3>Statistics (Mean, Median)</h3>
            <label>Data (comma-separated):</label>
            <input type="text" id="data" placeholder="e.g., 2,4,6,8,10" required>
            <button onclick="calculateStatistics()">Calculate</button>
        `;
    }
}

function calculateArithmetic() {
    let expression = document.getElementById('expression').value;
    let result = eval(expression);
    document.getElementById('experiment-result').innerHTML = `Result: ${result}`;
    
    // Save the experiment details
    saveExperiment(`Arithmetic Operations - Expression: ${expression}, Result: ${result}`);
}

function calculateStatistics() {
    let data = document.getElementById('data').value.split(',').map(Number);
    let mean = data.reduce((a, b) => a + b, 0) / data.length;
    let sortedData = data.sort((a, b) => a - b);
    let median = sortedData.length % 2 === 0 ?
        (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2 :
        sortedData[Math.floor(sortedData.length / 2)];
    document.getElementById('experiment-result').innerHTML = `Mean: ${mean}, Median: ${median}`;
    
    // Save the experiment details
    saveExperiment(`Statistics - Data: ${data.join(', ')}, Mean: ${mean}, Median: ${median}`);
}

// Biology Experiment Functions
function showBiologyExperiment(organism) {
    let contentDiv = document.getElementById('biology-experiment-content');
    contentDiv.innerHTML = '';

    if (organism === 'human') {
        contentDiv.innerHTML = `
            <h3>Human (Homo sapiens)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Head</li>
                <li>Arms</li>
                <li>Legs</li>
                <li>Heart</li>
                <li>Brain</li>
            </ul>
        `;
    } else if (organism === 'plant') {
        contentDiv.innerHTML = `
            <h3>Plant (Plantae)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Roots</li>
                <li>Stem</li>
                <li>Leaves</li>
                <li>Flowers</li>
                <li>Fruits</li>
            </ul>
        `;
    } else if (organism === 'frog') {
        contentDiv.innerHTML = `
            <h3>Frog (Rana temporaria)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Head</li>
                <li>Arms</li>
                <li>Legs</li>
                <li>Liver</li>
                <li>Heart</li>
            </ul>
        `;
    } else if (organism === 'fish') {
        contentDiv.innerHTML = `
            <h3>Fish (Pisces)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Fins</li>
                <li>Scales</li>
                <li>Gills</li>
                <li>Heart</li>
                <li>Brain</li>
            </ul>
        `;
    } else if (organism === 'bird') {
        contentDiv.innerHTML = `
            <h3>Bird (Aves)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Beak</li>
                <li>Wings</li>
                <li>Feathers</li>
                <li>Heart</li>
                <li>Brain</li>
            </ul>
        `;
    }
    
    // Save the experiment details
    saveExperiment(`Biology Experiment - Organism: ${organism}`);
}

// Guest Physics Experiment Functions (continued)
function runGuestPhysicsExperiment(experiment) {
    let resultDiv = document.getElementById('experiment-result');
    let results = {
        'guest_physics_experiment1': 'Result: The pendulum swings back and forth due to gravity.',
        'guest_physics_experiment2': 'Result: Objects in free fall accelerate at 9.8 m/s².',
        'guest_physics_experiment3': 'Result: Projectile motion follows a parabolic trajectory.',
        'guest_physics_experiment4': 'Result: Hooke\'s Law states that F = kx.',
        'guest_physics_experiment5': 'Result: Ohm\'s Law states that V = IR.',
    };

    let result = results[experiment] || 'No result found for the selected experiment.';
    resultDiv.innerHTML = result;
}

// Guest Chemistry Experiment Functions
function runGuestChemistryExperiment(experiment) {
    let resultDiv = document.getElementById('experiment-result');
    let results = {
        'guest_chemistry_experiment1': 'Result: Mixing HCl with NaOH produces NaCl (Salt) and H2O (Water).',
        'guest_chemistry_experiment2': 'Result: Mixing H2SO4 with KOH produces K2SO4 (Potassium Sulfate) and H2O (Water).',
        'guest_chemistry_experiment3': 'Result: Mixing HNO3 with NH3 produces NH4NO3 (Ammonium Nitrate).',
        'guest_chemistry_experiment4': 'Result: Mixing CH3COOH with Ca(OH)2 produces Ca(CH3COO)2 (Calcium Acetate) and H2O (Water).',
        'guest_chemistry_experiment5': 'Result: Mixing H2CO3 with KOH produces KHCO3 (Potassium Bicarbonate) and H2O (Water).',
    };

    let result = results[experiment] || 'No result found for the selected experiment.';
    resultDiv.innerHTML = result;
}

// Guest Biology Experiment Functions
function showGuestBiologyExperiment(organism) {
    let contentDiv = document.getElementById('biology-experiment-content');
    contentDiv.innerHTML = '';

    if (organism === 'guest_human') {
        contentDiv.innerHTML = `
            <h3>Guest Human (Homo sapiens)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Head</li>
                <li>Arms</li>
                <li>Legs</li>
                <li>Heart</li>
                <li>Brain</li>
            </ul>
        `;
    } else if (organism === 'guest_plant') {
        contentDiv.innerHTML = `
            <h3>Guest Plant (Plantae)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Roots</li>
                <li>Stem</li>
                <li>Leaves</li>
                <li>Flowers</li>
                <li>Fruits</li>
            </ul>
        `;
    } else if (organism === 'guest_frog') {
        contentDiv.innerHTML = `
            <h3>Guest Frog (Rana temporaria)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Head</li>
                <li>Arms</li>
                <li>Legs</li>
                <li>Liver</li>
                <li>Heart</li>
            </ul>
        `;
    } else if (organism === 'guest_fish') {
        contentDiv.innerHTML = `
            <h3>Guest Fish (Pisces)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Fins</li>
                <li>Scales</li>
                <li>Gills</li>
                <li>Heart</li>
                <li>Brain</li>
            </ul>
        `;
    } else if (organism === 'guest_bird') {
        contentDiv.innerHTML = `
            <h3>Guest Bird (Aves)</h3>
            <p>Label the parts:</p>
            <ul>
                <li>Beak</li>
                <li>Wings</li>
                <li>Feathers</li>
                <li>Heart</li>
                <li>Brain</li>
            </ul>
        `;
    }
}

// Guest Mathematics Experiment Functions
function showGuestMathExperiment(experiment) {
    let inputsDiv = document.getElementById('math-experiment-inputs');
    inputsDiv.innerHTML = '';
    document.getElementById('experiment-result').innerHTML = '';

    if (experiment === 'guest_arithmetic') {
        inputsDiv.innerHTML = `
            <h3>Guest Arithmetic Operations</h3>
            <label>Expression:</label>
            <input type="text" id="expression" placeholder="e.g., 3+5*2-4/2" required>
            <button onclick="calculateGuestArithmetic()">Calculate</button>
        `;
    } else if (experiment === 'guest_statistics') {
        inputsDiv.innerHTML = `
            <h3>Guest Statistics (Mean, Median)</h3>
            <label>Data (comma-separated):</label>
            <input type="text" id="data" placeholder="e.g., 2,4,6,8,10" required>
            <button onclick="calculateGuestStatistics()">Calculate</button>
        `;
    }
}

function calculateGuestArithmetic() {
    let expression = document.getElementById('expression').value;
    let result = eval(expression);
    document.getElementById('experiment-result').innerHTML = `Result: ${result}`;
}

function calculateGuestStatistics() {
    let data = document.getElementById('data').value.split(',').map(Number);
    let mean = data.reduce((a, b) => a + b, 0) / data.length;
    let sortedData = data.sort((a, b) => a - b);
    let median = sortedData.length % 2 === 0 ?
        (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2 :
        sortedData[Math.floor(sortedData.length / 2)];
    document.getElementById('experiment-result').innerHTML = `Mean: ${mean}, Median: ${median}`;
}

// Save Experiment Function
function saveExperiment(details) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_experiment.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Experiment saved:', xhr.responseText);
        }
    };
    xhr.send("experiment_details=" + encodeURIComponent(details));
}
