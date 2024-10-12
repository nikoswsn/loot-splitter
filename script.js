let totalCopper = 0;
let copperPerMember = 0;
let remainingCopper = 0;
let platinumPerMember = 0;
let goldPerMember = 0;
let electrumPerMember = 0;
let silverPerMember = 0;
let members = 0;
let remainingPlatinum = 0;
let remainingGold = 0;
let remainingElectrum = 0;
let remainingSilver = 0;
function calculateLoot() {
    let platinum = parseInt(document.getElementById('pp').value) || 0;
    let gold = parseInt(document.getElementById('gp').value) || 0;
    let electrum = parseInt(document.getElementById('ep').value) || 0;
    let silver = parseInt(document.getElementById('sp').value) || 0;
    let copper = parseInt(document.getElementById('cp').value) || 0;
    members = parseInt(document.getElementById('members').value) || 1;

    // Get the selected conversion option
    let conversionOption = document.querySelector('input[name="conversion"]:checked').value;
    
    if (conversionOption === 'none') {
        // No conversion: Split each currency individually without converting
        platinumPerMember = Math.floor(platinum / members);
        goldPerMember = Math.floor(gold / members);
        electrumPerMember = Math.floor(electrum / members);
        silverPerMember = Math.floor(silver / members);
        copperPerMember = Math.floor(copper / members);

        remainingPlatinum = platinum % members;
        remainingGold = gold % members;
        remainingElectrum = electrum % members;
        remainingSilver = silver % members;
        remainingCopper = copper % members;

        // Update the UI with the results
        document.getElementById('rs-pp').innerHTML = platinumPerMember;
        document.getElementById('rs-gp').innerHTML = goldPerMember;
        document.getElementById('rs-ep').innerHTML = electrumPerMember;
        document.getElementById('rs-sp').innerHTML = silverPerMember;
        document.getElementById('rs-cp').innerHTML = copperPerMember;
        document.getElementById('remaining').innerHTML = 
            `PP: ${remainingPlatinum}, GP: ${remainingGold}, EP: ${remainingElectrum}, SP: ${remainingSilver}, CP: ${remainingCopper}`;
    } else {
        // Convert all to copper for easier calculation (1 pp = 1000 cp, 1 gp = 100 cp, 1 ep = 50 cp, 1 sp = 10 cp, 1 cp = 1 cp)
        totalCopper = (platinum * 1000) + (gold * 100) + (electrum * 50) + (silver * 10) + copper;

        // Apply fee if 'Fee Conversion' is selected
        if (conversionOption === 'fee') {
            let feePercentage = parseFloat(document.getElementById('conversionFee').value) || 0;
            let feeAmount = totalCopper * (feePercentage / 100);
            totalCopper = totalCopper - feeAmount;
        }

        // Split the total copper evenly among members
        copperPerMember = Math.floor(totalCopper / members);
        remainingCopper = totalCopper % members;

        // Convert copper back to platinum, gold, electrum, silver, and copper
        platinumPerMember = Math.floor(copperPerMember / 1000);
        copperPerMember = copperPerMember % 1000;

        goldPerMember = Math.floor(copperPerMember / 100);
        copperPerMember = copperPerMember % 100;

        electrumPerMember = Math.floor(copperPerMember / 50);
        copperPerMember = copperPerMember % 50;

        silverPerMember = Math.floor(copperPerMember / 10);
        copperPerMember = copperPerMember % 10;

        // Update the UI with the results
        document.getElementById('rs-pp').innerHTML = platinumPerMember;
        document.getElementById('rs-gp').innerHTML = goldPerMember;
        document.getElementById('rs-ep').innerHTML = electrumPerMember;
        document.getElementById('rs-sp').innerHTML = silverPerMember;
        document.getElementById('rs-cp').innerHTML = copperPerMember;
        document.getElementById('remaining').innerHTML = `${remainingCopper} CP`;
    }
}


document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateLoot);
});

function copyText() {
    // The text you want to copy to the clipboard
    const textToCopy = `Each member of the ${members} gets: ${platinumPerMember}PP, ${goldPerMember}GP, ${electrumPerMember}EP, ${silverPerMember}SP, ${copperPerMember}CP\nRemaining: ${ document.getElementById('remaining').innerHTML}`;

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy)
}

document.getElementById('result').addEventListener('click', copyText);


// JavaScript to handle showing/hiding the fee input based on selection
const feeConversionRadio = document.getElementById('feeConversion');
const feeInputContainer = document.getElementById('feeInputContainer');

feeConversionRadio.addEventListener('change', () => {
  if (feeConversionRadio.checked) {
    feeInputContainer.style.display = 'flex';
  }
});

const otherRadios = document.querySelectorAll('input[name="conversion"]:not(#feeConversion)');
otherRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    feeInputContainer.style.display = 'none';
  });
});