let totalCopper = 0;
let copperPerMember = 0;
let remainingCopper = 0;
let platinumPerMember = 0;
let goldPerMember = 0;
let electrumPerMember = 0;
let silverPerMember = 0;
let members = 0;

function calculateLoot() {
    let platinum = parseInt(document.getElementById('pp').value) || 0;
    let gold = parseInt(document.getElementById('gp').value) || 0;
    let electrum = parseInt(document.getElementById('ep').value) || 0;
    let silver = parseInt(document.getElementById('sp').value) || 0;
    let copper = parseInt(document.getElementById('cp').value) || 0;
    members = parseInt(document.getElementById('members').value) || 1;

    // Convert all to copper for easier calculation (1 pp = 1000 cp, 1 gp = 100 cp, 1 ep = 50 cp, 1 sp = 10 cp, 1 cp = 1 cp)
    totalCopper = (platinum * 1000) + (gold * 100) + (electrum * 50) + (silver * 10) + copper;

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

    document.getElementById('rs-pp').innerHTML = platinumPerMember;
    document.getElementById('rs-gp').innerHTML = goldPerMember;
    document.getElementById('rs-ep').innerHTML = electrumPerMember;
    document.getElementById('rs-sp').innerHTML = silverPerMember;
    document.getElementById('rs-cp').innerHTML = copperPerMember;
    document.getElementById('remaining').innerHTML = remainingCopper;
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateLoot);
});

function copyText() {
    // The text you want to copy to the clipboard
    const textToCopy = `Each member of the ${members} gets: ${platinumPerMember}PP, ${goldPerMember}GP, ${electrumPerMember}EP, ${silverPerMember}SP, ${copperPerMember}CP\nRemaining: ${remainingCopper}CP`;

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy).then(function() {
        // Success message
        document.getElementById("feedback").innerText = "Text copied to clipboard!";
    }).catch(function(error) {
        // Error handling
        document.getElementById("feedback").innerText = "Failed to copy text!";
        console.error('Error copying text: ', error);
    });
}

document.getElementById('result').addEventListener('click', copyText);
